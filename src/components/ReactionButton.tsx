import { Post, PostReaction } from "../types/types";
import { useAddReactionMutation } from "../store/feature/posts/postsApiSlice";

const reactionEmoji: { [K in keyof PostReaction]: string } = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕️",
};

type ReactionButtonProps = {
  post: Post;
};

const ReactionButton = ({ post }: ReactionButtonProps) => {
  const [addReaction] = useAddReactionMutation();

  const handleReaction = async (postId: string, name: keyof PostReaction) => {
    try {
      const newReactions = { ...post.reactions, [name]: post.reactions[name] + 1 };
      await addReaction({ postId, reactions: newReactions });
    } catch (err) {
      console.error("Failed to add reaction: ", err);
    }
  };

  return (
    <div className="reaction">
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          className="reaction__btn"
          key={name}
          onClick={() => handleReaction(post.id, name as keyof PostReaction)}
        >
          {emoji} {post.reactions[name as keyof PostReaction]}
        </button>
      ))}
    </div>
  );
};

export default ReactionButton;
