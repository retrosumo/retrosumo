import React, { useContext, useEffect, useRef, useState } from "react";
import { Waypoint } from "react-waypoint";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { formatDistance, parseISO } from "date-fns";
import classNames from "classnames";

import UserContext from "../contexts/User";
import { useHotKey } from "../hooks/useHotKey";

import { TextareaField } from "./Form";
import { Empty, End, Loader } from "./ListStates";

const HOTKEY_CODE = "command+enter";

export const Post = () => {
    const [text, setText] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [posts, setPosts] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [nextCursor, setNextCursor] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToasts();

    const showToast = (message, customOptions = {}) => {
        const defaultOptions = {
            appearance: "success",
            autoDismiss: true
        };

        const options = { ...defaultOptions, ...customOptions };

        addToast(message, options);
    };

    const storePost = async () => {
        if (isValid) {
            try {
                const { data: newPost } = await axios.post("/api/posts", {
                    text
                });

                setPosts([newPost, ...posts]);
                setText("");

                showToast("Posted successfully.");
            } catch (err) {
                console.error(err);
            }
        }
    };

    const updatePost = async (id, text, callback) => {
        try {
            const { data: updatedPost } = await axios.put(`/api/posts/${id}`, {
                text
            });

            const updatedPosts = [...posts];
            const index = posts.findIndex(p => p.id === id);
            updatedPosts[index] = updatedPost;

            setPosts(updatedPosts);
            showToast("Post updated successfully.");
            callback();
        } catch (err) {
            console.error(err);
        }
    };

    const deletePost = async id => {
        const confirmMsg = "Are you sure you want to delete this post?";

        if (confirm(confirmMsg)) {
            try {
                await axios.delete(`/api/posts/${id}`);

                setPosts(posts.filter(p => p.id !== id));

                showToast("Post deleted successfully.");
            } catch (err) {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                let uri = `/api/posts`;

                if (nextCursor) {
                    uri += `?next_cursor=${nextCursor}`;
                }
                const response = await axios.get(uri);

                setPosts(posts.concat(response.data.data));
                setNextCursor(response.data.next_cursor);
                setHasMore(response.data.next_cursor !== null);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [cursor]);

    useEffect(() => {
        setIsValid(text.length > 0);
    }, [text]);

    const isEmpty = posts.length === 0;

    return (
        <>
            <PostForm
                text={text}
                isValid={isValid}
                setText={setText}
                storePost={storePost}
            />
            <PostFeed
                posts={posts}
                deletePost={deletePost}
                updatePost={updatePost}
            />

            {!isLoading && hasMore && (
                <Waypoint onEnter={() => setCursor(nextCursor)} />
            )}
            {isLoading && <Loader />}
            {!isLoading && isEmpty && <Empty text="No posts to display." />}
            {!isLoading && !hasMore && !isEmpty && (
                <End>
                    <span className="mr-2">🎉</span>
                    You have reached the end of the feed.
                </End>
            )}
        </>
    );
};

export const PostForm = ({ isValid, text, setText, storePost }) => {
    const submit = event => {
        event.preventDefault();

        storePost();
    };

    useHotKey(HOTKEY_CODE, submit, [text, isValid]);

    const submitButtonClass = classNames(
        "bg-pink-600 text-white rounded py-2 px-3 font-semibold uppercase tracking-widest text-sm focus:outline-none focus:shadow-outline",
        {
            "hover:bg-pink-700": isValid,
            "opacity-50 cursor-not-allowed": !isValid,
        }
    );

    return (
        <form className="my-8" onSubmit={submit}>
            <TextareaField
                autoFocus
                value={text}
                onChange={text => setText(text)}
                placeholder="What's going on?"
            />
            <div className="text-right">
                <button
                    type="submit"
                    disabled={!isValid}
                    className={submitButtonClass}
                >
                    Post
                </button>
            </div>
        </form>
    );
};

export const EditPostForm = ({ onCancel, originalText = "", updatePost }) => {
    const [text, setText] = useState(originalText);
    const [isValid, setIsValid] = useState(false);

    const editInputRef = useRef(null);

    const submit = event => {
        event.preventDefault();

        if (isValid) {
            updatePost(text);
        }
    };

    useEffect(() => {
        setIsValid(text.length > 0 && text !== originalText);
    }, [text]);

    useEffect(() => {
        const editField = editInputRef.current;

        editField.focus();
        editField.selectionStart = 0;
        editField.selectionEnd = text.length;
    }, [editInputRef]);

    useHotKey(HOTKEY_CODE, submit, [text, isValid]);

    const submitButtonClass = classNames(
        "mx-2",
        "bg-pink-600 text-white rounded py-2 px-3 font-semibold uppercase tracking-widest text-sm focus:outline-none focus:shadow-outline",
        {
            "hover:bg-pink-700": isValid,
            "opacity-50 cursor-not-allowed": !isValid,
        }
    );

    return (
        <form onSubmit={submit}>
            <TextareaField
                ref={editInputRef}
                value={text}
                onChange={text => setText(text)}
            />
            <div className="text-right -mx-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="mx-2 text-sm uppercase text-gray-600 px-3 py-2 rounded hover:bg-gray-200 hover:text-gray-700 focus:bg-gray-200 focus:text-gray-700 focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!isValid}
                    className={submitButtonClass}
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export const PostFeed = ({ deletePost, posts, updatePost }) => (
    <div>
        {posts.map(post => (
            <PostFeedItem
                key={post.id}
                post={post}
                deletePost={deletePost}
                updatePost={updatePost}
            />
        ))}
    </div>
);

const PostFeedItem = ({ deletePost, post, updatePost }) => {
    const { created_at, id, text, user } = post;

    const [isEditing, setIsEditing] = useState(false);

    const timestamp = formatDistance(parseISO(created_at), new Date(), {
        addSuffix: true
    });

    const { id: userId } = useContext(UserContext);
    const canEdit = userId === user.id;

    const onUpdatePost = text => {
        updatePost(id, text, () => {
            setIsEditing(false);
        });
    };

    return (
        <div className="mb-8 bg-white shadow rounded px-8 py-6">
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-700">
                    <span className="font-semibold text-black">
                        {user.name}
                    </span>{" "}
                    posted an update.
                </div>
                <div className="text-sm text-gray-600">{timestamp}</div>
            </div>
            {!isEditing && (
                <>
                    <div>{text}</div>
                    {canEdit && (
                        <div className="flex mt-4 -mx-2 justify-end">
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="mx-2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-200 hover:text-gray-700 focus:bg-gray-200 focus:text-gray-700 focus:outline-none focus:shadow-outline"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => deletePost(id)}
                                className="mx-2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-red-200 hover:text-red-700 focus:bg-red-200 focus:text-red-700 focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <EditPostForm
                    onCancel={() => setIsEditing(false)}
                    originalText={text}
                    updatePost={onUpdatePost}
                />
            )}
        </div>
    );
};

export default Post;
