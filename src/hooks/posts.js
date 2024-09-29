import Swal from 'sweetalert2';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { useCallback, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuth } from './auth';
import axios from 'axios';

export function useAddPost() {
  const [isLoading, setLoading] = useState(false);

  // Use useCallback to memoize the function
  const addPost = useCallback(async (post, url) => {
    try {
      setLoading(true);
      
      const id = doc(collection(db, "posts")).id;

      await setDoc(doc(db, "posts", id), {
        ...post,
        id,
        date: Date.now(),
        image: url,
      });

      // Send notification to all users
      try {
        const response = await axios.post(
          'https://pushbackend-lt3b2m0i.b4a.run/sendAll',
          {
            title: 'New Post!',
            message: `${post.text} near ${post.address}.`,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Notification sent successfully:', response.data);
      } catch (error) {
        console.error('Error sending notification:', error);
      }

      // Show success alert using Swal
      await Swal.fire({
        icon: 'success',
        title: 'Post added successfully!',
        showConfirmButton: false,
        timer: 2000
      });

    } catch (error) {
      console.error('Error adding post:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error adding post',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  }, []);

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
      confirmButtonColor: 'green', // Change confirm button color
      cancelButtonColor: '#d33',      // Change cancel button color
    });

    if (res.isConfirmed) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "posts", id));

      // Display info alert using Swal
      await Swal.fire({
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



export function useAcceptRequest(id) {
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth(); // Assuming this gives you the current user

  async function acceptRequest() {
    setLoading(true);

    try {
      // Get the post document to retrieve the user ID
      const postDoc = await getDoc(doc(db, "posts", id));
      if (!postDoc.exists()) {
        throw new Error("Post not found");
      }
      const postData = postDoc.data();
      const requesterUserId = postData.uid; // Assuming 'uid' field holds the user ID of the requester

      // Update post document to mark as accepted
      await updateDoc(doc(db, "posts", id), {
        request: true,
        acceptby: user.username,
      });

      // Send notification to the user who requested
      const notificationResponse = await axios.post(
        'https://pushbackend-lt3b2m0i.b4a.run/sendToUser', // Replace with your backend endpoint
        {
          userId: requesterUserId, // The ID of the user to notify
          title: 'Request Accepted',
          message: `Your request has been accepted by ${user.username}.`
        }
      );

      console.log('Notification sent successfully:', notificationResponse.data);

      // Display success alert using Swal
      await Swal.fire({
        icon: 'success',
        title: 'Request accepted successfully!',
        showConfirmButton: false,
        timer: 2000
      });

    } catch (error) {
      console.error('Error accepting request:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error accepting request',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return { acceptRequest, isLoading };
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
