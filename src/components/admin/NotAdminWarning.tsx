export default function NotAdminWarning({ email }: { email?: string }) {
  return (
    <p className="adm-warn mb-6">
      You&rsquo;re logged in as <strong>{email}</strong>, but this account isn&rsquo;t on the list of administrators,
      so nothing you save will go through. See SETUP.md, step 3.
    </p>
  );
}
