import ProfileForm from "@/src/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="page-container">
      <div className="profile-content">
        <h2>Your Profile</h2>
        <ProfileForm />
      </div>
    </div>
  );
}
