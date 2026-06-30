import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {

    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);

    const getProfile = async () => {
        const res = await api.get("accounts/profile/");
        setUser(res.data);
    };

    useEffect(() => {
        getProfile();
    }, []);

    const saveProfile = async () => {
    const formData = new FormData();

    formData.append("bio", user.bio || "");
    formData.append("headline", user.headline || "");

    if (user.avatarFile) {
        formData.append("avatar", user.avatarFile);
    }

    await api.put("accounts/profile/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    alert("Profile Updated");
    setEditing(false);
};

    return (
        <div className="profile-container">

            <div className="profile-card">

                <img
               src={user.avatar || "https://placehold.co/150"}
                alt=""
              className="profile-avatar"
              />

                {editing ? (
                    <>  
                        <input
                        type="file"
                        onChange={(e) =>
                       setUser({ ...user, avatarFile: e.target.files[0] })
                       }
                       />
                        <input
                            value={user.headline || ""}
                            onChange={(e) =>
                                setUser({ ...user, headline: e.target.value })
                            }
                        />

                        <textarea
                            value={user.bio || ""}
                            onChange={(e) =>
                                setUser({ ...user, bio: e.target.value })
                            }
                        />

                        <button onClick={saveProfile}>
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <h2>{user.username}</h2>

                        <p>{user.email}</p>

                        <p>{user.role}</p>

                        <h3>{user.headline}</h3>

                        <p>{user.bio}</p>

                        <button onClick={() => setEditing(true)}>
                            Edit Profile
                        </button>
                    </>
                )}

            </div>

        </div>
    );
}