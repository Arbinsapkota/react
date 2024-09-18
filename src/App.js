import React from 'react';
import RootLayout from './Layout/RootLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/features/Home';
import ContactUs from './ui/features/ContactUs';
import Members from './ui/features/Members';
import PhotoGallery from './ui/pages/activities/PhotoGallery';
import Notice from './ui/pages/activities/Notice';
import TapaikoGunaso from './components/homeComponents/TapaikoGunaso';
import Graph from './ui/pages/rates/Graph';
import History from './ui/pages/rates/History';
import Introduction from './ui/pages/aboutUs/Introduction';
import ExecutiveC from './ui/pages/aboutUs/ExecutiveC';
import ReadMoreNotice from './ui/pages/activities/ReadMoreNotice';
import News from './ui/pages/activities/News';
import PastCommittee from './ui/pages/aboutUs/PastCommittee';
import Login from './admin/auth/Login';

import AdminHome from './admin/features/ui/AdminHome';
import AdminLayout from './admin/features/Layout/AdminLayout';
import Carat22 from './admin/features/pages/Carat22';
import Carat24 from './admin/features/pages/Carat24';
import PureSilver from './admin/features/pages/PureSilver';
import BannerPage from './admin/features/pages/BannerPage';
import RecentNews from './admin/features/pages/RecentNews';
import AdminGallery from './admin/features/pages/AdminGallery';
import AdminPastCommittee from './admin/features/pages/AdminPastCommittee';
import AdminExecutiveCommittee from './admin/features/pages/AdminExecutiveCommittee';
import EditMembers from './admin/features/pages/EditMembers';

import { AuthProvider } from './route/protectingRoute/AuthProvider';
import ProtectedRoute from './route/protectingRoute/ProtectedRoute';
import AdminNotice from './admin/features/pages/AdminNotice';
import AdminPupUp from './admin/features/pages/AdminPupUp';
import ReadMoreNews from './ui/pages/activities/ReadMoreNews';
import PageNotFound from './shared/PageNotFound';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/contact', element: <ContactUs /> },
        // ---about us Routing
        { path: '/about/intro', element: <Introduction /> },
        { path: '/about/pastCommittee', element: <PastCommittee /> },
        { path: 'about/executive', element: <ExecutiveC /> },
        { path: '/executive', element: <ExecutiveC /> },
        // ---Rates Routing
        { path: '/history', element: <History /> },
        { path: '/graph', element: <Graph /> },
        // Activities Routing
        { path: '/news', element: <News /> },
        { path: '/notices', element: <Notice /> },
       
        { path: '/notice/readMoreNotice/:id', element: <ReadMoreNotice /> },
        { path: '/news/readMoreNews/:id', element: <ReadMoreNews /> },
        { path: '/photoGallery', element: <PhotoGallery /> },
        // तपाइको गुनासो मलाई
        { path: '/gunaso', element: <TapaikoGunaso /> },

        // for the admin
        { path: '/login', element: <Login /> },

        { path: '*', element: <PageNotFound/> }
      ],
    },
    {
      path: '/admin',
      element: <ProtectedRoute element={<AdminLayout />} />,
      children: [
        { index: true, element: <AdminHome /> },
        { path: 'carat22', element: <Carat22 /> },
        { path: 'carat24', element: <Carat24 /> },
        { path: 'pureSilver', element: <PureSilver /> },
        { path: 'bannerPage', element: <BannerPage /> },
        { path: 'recentNews', element: <RecentNews /> },
        { path: 'gallery', element: <AdminGallery /> },
        { path: 'notice', element: <AdminNotice /> },
        { path: 'popMessage', element: <AdminPupUp /> },
        // for the about us
        { path: 'past-committee', element: <AdminPastCommittee /> },
        { path: 'executive-committee', element: <AdminExecutiveCommittee /> },
        // for the Members list
        { path: 'memberList', element: <EditMembers /> },
      ],
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
