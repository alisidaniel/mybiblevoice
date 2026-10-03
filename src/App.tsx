import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { InstallBanner } from "./components/pwa/InstallBanner";
import { OfflineBadge } from "./components/ui/OfflineBadge";


import DailyFeed from "./pages/DailyFeed";
import StoryExplorer from "./pages/StoryExplorer";
import StoryDetail from "./pages/StoryDetail";
import Journal from "./pages/Journal";
import Topics from "./pages/Topics";
import Saved from "./pages/Saved";
import Week from "./pages/Week";
import WeekLetter from "./pages/WeekLetter";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CommunityDetail from "./pages/CommunityDetail";
import ReadingPlans from "./pages/ReadingPlans";
import PlanDetail from "./pages/PlanDetail";
import Community from "./pages/Community";
import NewPick from "./pages/NewPick";


function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#FAFAFA] text-zinc-400 dark:bg-zinc-950">
        Loading…
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

function OnboardingGate() {
  const { hasOnboarded } = useApp();
  if (!hasOnboarded) return <Navigate to="/onboarding" replace />;
  return <AppLayout />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* onboarding — auth required, no app shell */}
            <Route
              path="/onboarding"
              element={
                <RequireAuth>
                  <Onboarding />
                </RequireAuth>
              }
            />

            {/* app — auth + onboarded */}
            <Route
              element={
                <RequireAuth>
                  <OnboardingGate />
                </RequireAuth>
              }
            >
              <Route path="/" element={<DailyFeed />} />
              <Route path="/week" element={<Week />} />
              <Route path="/week/letter" element={<WeekLetter />} />
              <Route path="/stories" element={<StoryExplorer />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/community/:id" element={<CommunityDetail />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/new" element={<NewPick />} />
              <Route path="/plans" element={<ReadingPlans />} />
              <Route path="/plans/:id" element={<PlanDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <InstallBanner />
          <OfflineBadge />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}