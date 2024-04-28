import Swal from "sweetalert2";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { useEffect, useState } from "react";
import { HERO, LOGIN } from "lib/routes";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import isUsernameExists from "utils/isUsernameExists";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = HERO, setForgot }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "You are logged in",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate(redirectTo);
      });
    } catch (error) {
      setForgot(true);
      Swal.fire({
        icon: "error",
        title: "Logging in failed",
        text: error.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    role,
    phoneNumber,
    redirectTo = HERO,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      Swal.fire({
        icon: "error",
        title: "Username already exists",
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
          role: role,
          ph: parseInt(phoneNumber),
        });

        Swal.fire({
          icon: "success",
          title: "Account created",
          text: "You are logged in",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate(redirectTo);
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Signing Up failed",
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      Swal.fire({
        icon: "success",
        title: "Successfully logged out",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        navigate(LOGIN);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Logout failed",
      });
    }
  }

  return { logout, isLoading };
}
