import React from 'react'
import { useArticleCommentsQuery, useAuth } from '../hooks'
import { Link } from 'react-router-dom';
import ArticleComment from './ArticleComment';
import ArticleCommentForm from './ArticleCommentForm';

function ArticleComments() {
    const { isAuth } = useAuth();
    const {
        isArticleCommentsLoading,
        articleComments,
        articleCommentsError,
    } = useArticleCommentsQuery();

    if (!isAuth) {
        return (
            <p>
                <Link to='/login'>Sign in</Link> or
                <Link to='/register'> Sign up</Link> to add a comment on this article
            </p>
        )
    }

    if (isArticleCommentsLoading) {
        return <p>Loading comments...</p>;
    }

    if (articleCommentsError) {
        return <p>Error loading comments: {articleCommentsError.message}</p>;
    }

    return (
        <div>
            <ArticleCommentForm />

            {articleComments?.comments?.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
            ) : (
                articleComments.comments.map((comment) => (
                    <ArticleComment key={comment.id} comment={comment} />
                ))
            )}
        </div>
    )
}

export default ArticleComments;