import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Interests from "@/pages/interests.tsx";
import JournalPage from "@/pages/JournalPage.tsx";
import GalleryPage from "@/pages/GalleryPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* CUSTOM ROUTES */}
          <Route path="/me" element={<Interests />} />
          <Route path="/journal" element={<JournalPage />} /> {/* Nouvelle route */}
          <Route path="/gallery" element={<GalleryPage />} /> {/* Nouvelle route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
