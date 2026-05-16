import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle, Reply, Shield, User, ExternalLink, ChevronDown } from 'lucide-react';
import { Comment, CommentReply } from '../types';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  totalCount: number;
}

// Single Comment Component - Compact
const CommentCard: React.FC<{
  comment: Comment;
  onReply: (commentId: string, content: string, name: string) => void;
}> = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyName.trim() && replyContent.trim()) {
      onReply(comment.id, replyContent, replyName);
      setShowReplyForm(false);
      setReplyName('');
      setReplyContent('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-army-green/10 p-4">
      {/* Comment Header - Inline */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-army-green/10 flex items-center justify-center">
          <User className="w-4 h-4 text-army-green" />
        </div>
        <span className="font-semibold text-sm text-army-navy">{comment.name}</span>
        <span className="text-xs text-army-olive/50">•</span>
        <span className="text-xs text-army-olive/50">{comment.date}</span>
        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="ml-auto text-xs text-army-olive/60 hover:text-army-green flex items-center gap-1 transition-colors"
        >
          <Reply size={12} />
          Reply
        </button>
      </div>

      {/* Comment Content */}
      <p className="text-sm text-army-navy/80 leading-relaxed pl-10">{comment.content}</p>

      {/* Reply Form - Compact */}
      {showReplyForm && (
        <form onSubmit={handleSubmitReply} className="mt-3 ml-10 pl-3 border-l-2 border-army-green/20">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded border border-army-green/20 text-xs focus:border-army-green outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-2 py-1.5 text-army-olive/60 text-xs hover:text-army-navy"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-2">
            <textarea
              placeholder="Write reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={1}
              className="flex-1 px-2.5 py-1.5 rounded border border-army-green/20 text-xs focus:border-army-green outline-none resize-none"
              required
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-army-green text-white text-xs rounded hover:bg-army-olive transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      )}

      {/* Existing Replies - Compact */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 ml-10 space-y-2">
          {comment.replies.map((reply) => (
            <div
              key={reply.id}
              className={`pl-3 border-l-2 ${reply.isAuthor ? 'border-army-gold bg-army-gold/5' : 'border-army-green/15'} py-2 rounded-r`}
            >
              <div className="flex items-center gap-2 mb-1">
                {reply.isAuthor && (
                  <span className="bg-army-gold/20 text-army-gold text-[10px] font-bold px-1.5 py-0.5 rounded">
                    AUTHOR
                  </span>
                )}
                <span className="font-medium text-xs text-army-navy">{reply.name}</span>
                <span className="text-[10px] text-army-olive/50">• {reply.date}</span>
              </div>
              <p className="text-xs text-army-navy/80">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, totalCount }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
    notifyReplies: false,
    policyAgreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', content: '', notifyReplies: false, policyAgreed: false });
    }, 1500);
  };

  const handleReply = (commentId: string, content: string, name: string) => {
    alert('Reply submitted for moderation. It will appear once approved.');
  };

  // Pagination
  const totalPages = Math.ceil(localComments.length / commentsPerPage);
  const paginatedComments = localComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  return (
    <section id="comments" className="py-8 bg-army-cream border-t border-army-green/10 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header - Compact */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-army-green" />
            <h2 className="text-lg font-serif font-bold text-army-green">Public Responses</h2>
            <span className="bg-army-green/10 text-army-green text-xs font-bold px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-army-olive/60">
            <Shield className="w-3.5 h-3.5" />
            <span>Moderated</span>
          </div>
        </div>

        {/* Comment Form - Compact */}
        <div className="bg-white rounded-lg border border-army-green/10 p-4 mb-6 shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-6">
              <CheckCircle className="w-10 h-10 text-army-green mx-auto mb-2" />
              <p className="font-medium text-army-green text-sm mb-1">Comment Submitted</p>
              <p className="text-xs text-army-olive/70 mb-3">Awaiting moderation approval.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-army-green text-xs font-medium hover:underline"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name & Email Row */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md border border-army-green/20 focus:border-army-green outline-none text-sm"
                  placeholder="Name *"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md border border-army-green/20 focus:border-army-green outline-none text-sm"
                  placeholder="Email * (private)"
                />
              </div>
              
              {/* Comment */}
              <textarea
                name="content"
                required
                rows={3}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-army-green/20 focus:border-army-green outline-none text-sm resize-none"
                placeholder="Share your thoughts..."
              />

              {/* Policy & Submit Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex flex-col gap-2">
                  {/* Policy Agreement */}
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="policyAgreed"
                      required
                      checked={formData.policyAgreed}
                      onChange={handleChange}
                      className="w-4 h-4 text-army-green border-army-green/30 rounded focus:ring-army-green cursor-pointer"
                    />
                    <span className="text-xs text-army-navy/70 group-hover:text-army-navy">
                      I agree to the{' '}
                      <Link 
                        to="/comment-policy" 
                        target="_blank" 
                        className="text-army-green hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Comment Policy
                      </Link>
                    </span>
                  </label>
                  
                  {/* Notify checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifyReplies"
                      checked={formData.notifyReplies}
                      onChange={handleChange}
                      className="w-4 h-4 text-army-green border-army-green/30 rounded focus:ring-army-green cursor-pointer"
                    />
                    <span className="text-xs text-army-olive/60">Notify me of replies</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.policyAgreed}
                  className="bg-army-red text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit
                    </>
                  )}
                </button>
              </div>

              {/* Expandable Policy Notice */}
              <button
                type="button"
                onClick={() => setShowPolicy(!showPolicy)}
                className="w-full flex items-center justify-center gap-1 text-xs text-army-olive/50 hover:text-army-olive transition-colors pt-1"
              >
                <span>Comment Guidelines</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showPolicy ? 'rotate-180' : ''}`} />
              </button>
              
              {showPolicy && (
                <div className="bg-army-navy/5 rounded-md p-3 text-xs text-army-navy/60 space-y-1">
                  <p>• All comments moderated before publication</p>
                  <p>• Respectful discussion welcome • No hate speech, spam, or political campaigning</p>
                  <p>• Comments reflect individual views, not this website</p>
                  <Link 
                    to="/comment-policy" 
                    target="_blank"
                    className="text-army-green font-medium hover:underline inline-flex items-center gap-1 mt-1"
                  >
                    Full Policy <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Comments List */}
        <div className="space-y-3">
          {paginatedComments.length > 0 ? (
            paginatedComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} onReply={handleReply} />
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg border border-army-green/10">
              <MessageSquare className="w-8 h-8 text-army-olive/30 mx-auto mb-2" />
              <p className="text-sm text-army-olive/70 font-medium">No comments yet</p>
              <p className="text-xs text-army-olive/50">Be the first to respond.</p>
            </div>
          )}
        </div>

        {/* Pagination - Compact */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-army-green text-white'
                    : 'bg-white border border-army-green/20 text-army-navy hover:bg-army-green/5'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
