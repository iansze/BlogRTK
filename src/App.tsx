import AddPostForm from "./Pages/AddPostFormPage";
import PostsList from "./Pages/PostsListPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import SinglePost from "./Pages/SinglePostPage";
import EditForm from "./Pages/EditFormPage";
import UserPage from "./Pages/UserPage";
import UserList from "./Pages/UserListPage";
import "../src/styles/_base.scss";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isSlow, setSlow] = useState(false);

  useEffect(() => {
    const alreadyLoaded = localStorage.getItem("alreadyLoaded");

    if (!alreadyLoaded) {
      localStorage.setItem("alreadyLoaded", "true");

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      const slowLoadTimer = setTimeout(() => {
        if (isLoading) {
          setSlow(true);
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(slowLoadTimer);
      };
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div>
        {isSlow ? (
          <Loading messagae="This may take a little longer due to your connection speed." />
        ) : (
          <Loading messagae="Loading, please wait..." />
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<PostsList />} />
          <Route path="/post" element={<AddPostForm />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/post/edit/:id" element={<EditForm />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
