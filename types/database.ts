export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title_es: string;
          title_en: string | null;
          client_name: string | null;
          category: string | null;
          short_description_es: string;
          short_description_en: string | null;
          technologies: string[] | null;
          main_image_url: string | null;
          project_url: string | null;
          is_featured: boolean;
          is_published: boolean;
          is_in_progress: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_es: string;
          title_en?: string | null;
          client_name?: string | null;
          category?: string | null;
          short_description_es: string;
          short_description_en?: string | null;
          technologies?: string[] | null;
          main_image_url?: string | null;
          project_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          is_in_progress?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
