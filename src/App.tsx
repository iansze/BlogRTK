import AddPostForm from "./Pages/AddPostFormPage";
import PostsList from "./Pages/PostsListPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import SinglePost from "./Pages/SinglePostPage";
import EditForm from "./Pages/EditFormPage";
import UserPage from "./Pages/UserPage";
import UserList from "./Pages/UserListPage";
import "../src/styles/_base.scss";

const App = () => {
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
