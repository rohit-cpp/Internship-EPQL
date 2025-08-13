import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_QUERYLOG_ENDPOINT = `${import.meta.env.VITE_BACKEND_LINK}/api/v1/query`;

type QueryLog = {
  _id: string;
  user: { _id: string; fullname: string; email: string } | string;
  queryType: string;
  queryParams: any;
  resultCount: number;
  createdAt: string;
};

type QueryLogState = {
  logs: QueryLog[];
  loading: boolean;
  hasFetchedLogs: boolean;

  createLog: (input: {
    queryType: string;
    queryParams: any;
    resultCount: number;
  }) => Promise<void>;

  getAllLogs: () => Promise<void>;
  getUserLogs: () => Promise<void>;
  deleteLog: (logId: string) => Promise<void>;
};

export const useQueryLogStore = create<QueryLogState>()(
  persist(
    (set, get) => ({
      logs: [],
      loading: false,
      hasFetchedLogs: false,

      createLog: async (input) => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const resp = await axios.post(`${API_QUERYLOG_ENDPOINT}/`, input, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (resp.data.success) {
            set((state) => {
              const existingLog = state.logs.find(
                (log) => log._id === resp.data.log._id
              );
              if (!existingLog) {
                return {
                  logs: [resp.data.log, ...state.logs],
                  loading: false,
                };
              }
              return { loading: false };
            });
            toast.success("Query log created");
          }
        } catch (err: any) {
          set({ loading: false });
          toast.error(err.response?.data?.message || "Error creating query log");
        }
      },

      getAllLogs: async () => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const resp = await axios.get(`${API_QUERYLOG_ENDPOINT}/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (resp.data.success) {
            set({ logs: resp.data.logs, loading: false });
          }
        } catch (err) {
          toast.error("Failed to fetch all logs");
          set({ loading: false });
        }
      },

      getUserLogs: async () => {
        if (get().hasFetchedLogs) return; // ✅ Prevent re-fetching

        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const resp = await axios.get(`${API_QUERYLOG_ENDPOINT}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (resp.data.success) {
            set({
              logs: resp.data.logs,
              loading: false,
              hasFetchedLogs: true, // ✅ Mark as fetched
            });
          }
        } catch (err) {
          toast.error("Failed to fetch user logs");
          set({ loading: false });
        }
      },

      deleteLog: async (logId) => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const resp = await axios.delete(`${API_QUERYLOG_ENDPOINT}/${logId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (resp.data.success) {
            set((state) => ({
              logs: state.logs.filter((log) => log._id !== logId),
              loading: false,
            }));
            toast.success("Query log deleted");
          }
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Error deleting log");
          set({ loading: false });
        }
      },
    }),
    {
      name: "querylog-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
