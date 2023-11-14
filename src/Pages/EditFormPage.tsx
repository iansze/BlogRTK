import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import { Post } from "../types/types";
import { useUpdatePostMutation, useDeletePostMutation } from "../store/feature/posts/postsApiSlice";
import { selectPostById } from "../store/feature/posts/postSlice";
import { selectAllUsers } from "../store/feature/user/userSlice";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const post = useSelector((state: RootState) => selectPostById(state, id as string));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);

  const onSavePostClicked = async () => {
    try {
      const editedPost: Post = {
        id: post.id,
        title: title || "",
        body: content || "",
        userId: userId!,
        date: post.date,
        reactions: post.reactions,
      };
      await updatePost(editedPost).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      deletePost(post.id).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <section className="formSection">
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
        <button className="deleteButton" type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditForm;
