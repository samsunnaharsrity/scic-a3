"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface Comment {
  _id: string;
  userName: string;
  userEmail?: string; 
  comment: string;
  createdAt: string;
  likes?: string[];
  replies?: {
    _id: string;
    userName: string;
    reply: string;
    createdAt: string;
  }[];
}

export default function CommentSection({ placeId }: { placeId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${placeId}`
      );
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error("Fetch comments error:", error);
    }
  };

  useEffect(() => {
    if (placeId) fetchComments();
  }, [placeId]);

  const handleComment = async () => {
    if (!user) return alert("You must be logged in to comment.");
    if (!comment.trim() || loading) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeId,
          userName: user.name,   
          userEmail: user.email, 
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.comment) {
        setComment("");
        setComments((prevComments) => [data.comment, ...prevComments]);
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Add comment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!user) return alert("You must be logged in to like.");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });
      const data = await res.json();
      if (data.success) {

        fetchComments();
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleReply = async (commentId: string) => {
    if (!user) return alert("You must be logged in to reply.");
    if (!replyText.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: user.name,
          userEmail: user.email,
          reply: replyText.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReplyText("");
        setReplyingTo(null);
        fetchComments();
      }
    } catch (error) {
      console.error("Reply error:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setComments((prev) => prev.filter((item) => item._id !== commentId));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (isPending) {
    return <p className="text-sm text-gray-500">Checking authentication...</p>;
  }

  return (
    <div>
      {/* Input Form */}
      {user ? (
        <div className="flex gap-3">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Comment as ${user.name}...`}
            className="border rounded-xl px-4 py-3 flex-1 focus:outline-none focus:border-black"
            disabled={loading}
          />
          <button
            onClick={handleComment}
            disabled={loading || !comment.trim()}
            className="bg-black text-white px-6 rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      ) : (
        <div className="border rounded-xl p-5 bg-gray-50 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm font-medium">Join the conversation! Please log in.</p>
          <Link href="/signin" className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition whitespace-nowrap">
            Login to Comment
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="mt-8 space-y-5">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((item) => {
            const hasLiked = item.likes?.includes(user?.email || "");

            return (
              <div key={item._id} className="rounded-xl border p-5 bg-white shadow-sm relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.userName}</h3>
                    <p className="mt-2 text-gray-600 text-sm whitespace-pre-line">{item.comment}</p>
                    <p className="mt-1 text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                  </div>
                  
                
                  {user && user.email === item.userEmail && (
                    <button onClick={() => handleDelete(item._id)} className="text-gray-400 hover:text-red-500 transition p-1">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="mt-4 flex gap-5 text-sm text-gray-500">
                  <button onClick={() => handleLike(item._id)} className={`flex items-center gap-2 transition ${hasLiked ? "text-red-500 font-medium" : "hover:text-black"}`}>
                    <Heart size={18} fill={hasLiked ? "currentColor" : "none"} />
                    Like {item.likes && item.likes.length > 0 && `(${item.likes.length})`}
                  </button>
                  <button onClick={() => setReplyingTo(replyingTo === item._id ? null : item._id)} className="flex items-center gap-2 hover:text-black transition">
                    <MessageCircle size={18} />Reply
                  </button>
                </div>


                {replyingTo === item._id && (
                  <div className="mt-4 flex gap-2 pl-4 border-l-2 border-gray-300">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="border rounded-lg px-3 py-1.5 text-sm flex-1 focus:outline-none"
                    />
                    <button onClick={() => handleReply(item._id)} className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-gray-800">
                      Reply
                    </button>
                  </div>
                )}

                {item.replies && item.replies.length > 0 && (
                  <div className="ml-10 mt-5 space-y-3 border-l-2 border-gray-100 pl-5">
                    {item.replies.map((reply) => (
                      <div key={reply._id} className="rounded-lg bg-gray-50 p-3">
                        <h4 className="font-medium text-gray-900 text-sm">{reply.userName}</h4>
                        <p className="mt-1 text-gray-600 text-sm">{reply.reply}</p>
                        <p className="mt-1 text-xs text-gray-400">{new Date(reply.createdAt).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}