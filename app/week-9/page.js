"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function SignInPage() {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(error);
        }
    }

    console.log(user);

    return (
        <main>
            <header>
                <h1>Firebase Auth</h1>
            </header>
            {user ? (
                <section>
                    <div>
                        <p>Welcome, {user.displayName}</p>
                        <p>{user.email}</p>
                        <img src={user.photoURL} className="w-10 h-10" />
                    </div>
                    <div>
                        <Link href="/week-9/shopping-list">Shopping List</Link>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="text-lg bg-blue-500 text-white rounded px-2 py-1 mt-4 hover:bg-blue-600 cursor-pointer">
                            Sign Out
                        </button>
                    </div>
                </section>
            ) : (
                <section>
                    <button
                        type="button"
                        onClick={handleSignIn}
                        className="text-lg bg-blue-500 text-white rounded px-2 py-1 mt-4 hover:bg-blue-600 cursor-pointer">
                        Sign In with GitHub
                    </button>
                </section >
            )
            }

        </main >
    );

}