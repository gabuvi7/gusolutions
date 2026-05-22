export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number;
          slug: string;
          title_es: string;
          title_en: string | null;
          client_name: string | null;
          category: string | null;
          short_description_es: string;
          short_description_en: string | null;
          technologies: string[];
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
          id?: never;
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
      contact_leads: {
        Row: {
          id: number;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          project_type: string | null;
          message: string;
          source: string;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: never;
          name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          project_type?: string | null;
          message: string;
          source?: string;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_leads"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
