import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_POI_ENDPOINT = `${import.meta.env.VITE_BACKEND_LINK}/api/v1/poi`;

type POI = {
  _id: string;
  title: string;
  description: string;
  location: { type: "Point"; coordinates: [number, number] };
  encryptedData: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
};

type POIState = {
  pois: POI[];
  decryptedPOIData: any | null;
  loading: boolean;

  createPOI: (input: {
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    plainData: any;
  }) => Promise<void>;

  listAllPOIs: () => Promise<void>;
  queryPOIsInRange: (input: {
    longitude: number;
    latitude: number;
    distance: number;
  }) => Promise<void>;
  decryptPOIData: (poiId: string) => Promise<void>;
};

export const usePOIStore = create<POIState>()(
  persist(
    (set) => ({
      pois: [],
      decryptedPOIData: null,
      loading: false,

      createPOI: async (input) => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const response = await axios.post(`${API_POI_ENDPOINT}/admin/poi`, input, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            toast.success("POI created successfully");
            set((state) => ({
              pois: [response.data.poi, ...state.pois],
              loading: false,
            }));
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Error creating POI");
          set({ loading: false });
        }
      },

      listAllPOIs: async () => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const response = await axios.get(`${API_POI_ENDPOINT}/admin/pois`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            set({
              pois: response.data.pois,
              loading: false,
            });
          }
        } catch (error) {
          toast.error("Failed to fetch POIs");
          set({ loading: false });
        }
      },

      queryPOIsInRange: async (input) => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const response = await axios.post(`${API_POI_ENDPOINT}/user/pois/search`, input, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            set({
              pois: response.data.pois,
              loading: false,
            });
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Error querying POIs");
          set({ loading: false });
        }
      },

      decryptPOIData: async (poiId: string) => {
        try {
          set({ loading: true });
          const token = localStorage.getItem("token") || "";
          const response = await axios.get(`${API_POI_ENDPOINT}/user/poi/${poiId}/decrypt`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            set({
              decryptedPOIData: response.data.data,
              loading: false,
            });
            toast.success("POI data decrypted");
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Decryption failed");
          set({ loading: false });
        }
      },
    }),
    {
      name: "poi-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
