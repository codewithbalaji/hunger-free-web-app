import Swal from 'sweetalert2';
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);

  async function addPost(post, url) {
    setLoading(true);
    const id = doc(collection(db, "posts")).id; // Using Firebase method to generate unique ID
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      image: url,
    });
    Swal.fire({
      icon: 'success',
      title: 'Post added successfully!',
      showConfirmButton: false,
      timer: 2000
    });
    setLoading(false);
  }

  return { addPost, isLoading };
}

export function useDeletePost(id) {
  const [isLoading, setLoading] = useState(false);

  async function deletePost() {
    const res = await Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete this post?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (res.isConfirmed) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "posts", id));

      Swal.fire({
        icon: 'info',
        title: 'Post deleted!',
        showConfirmButton: false,
        timer: 2000
      });

      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}

export function usePost(id) {
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}

export function usePosts(uid = null) {
  const q = uid
    ? query(
        collection(db, "posts"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { posts, isLoading };
}
