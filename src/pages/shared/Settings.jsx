import Title from "../../components/ui/Title.jsx";
import AvatarSection from "../../components/settings/AvatarSection.jsx";
import EmailSection from "../../components/settings/EmailSection.jsx";
import PasswordSection from "../../components/settings/PasswordSection.jsx";
import DangerSection from "../../components/settings/DangerSection.jsx";

const Settings = () => {
  return (
    <>
      <div className='search-container'>
        <Title tag='h1'>Settings</Title>
        <p>Manage your profile photo and sign-in details.</p>
      </div>

      <AvatarSection />
      <EmailSection />
      <PasswordSection />
      <DangerSection />
    </>
  );
};

export default Settings;
