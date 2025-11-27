import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Interests from "@/pages/interests.tsx";
import JournalPage from "@/pages/JournalPage.tsx";
import AdminPanel from "@/pages/AdminPanel.tsx";
// IMPORT DU NOUVEAU COMPOSANT
import CompatibilityWarning from "@/components/CompatibilityWarning.tsx";
import Navigation from "@/components/Navigation"; // Assurez-vous d'importer la navigation si elle est utilisée dans Index

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>

          <CompatibilityWarning />

          <Routes>
            <Route path="/" element={<Index />} />

            {/* CUSTOM ROUTES */}
            <Route path="/4rsi_about_area" element={<Interests />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/chin4_l34k" element={<AdminPanel />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;