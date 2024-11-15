import ProfileForm from "@/src/components/ProfileForm";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function ProfilePage() {
  return (
    <div className="page-container">
      <Header />
      <div className="profile-content">
        <h2>Your Profile</h2>
        <ProfileForm />
      </div>
      <Footer />
    </div>
  );
}
