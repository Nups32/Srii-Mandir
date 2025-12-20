
function Footer() {
  return (
    <>
      <footer>
        <div className="bg-black border-t fixed bottom-0 left-0 right-0 border-gray-700 !py-2 z-40 flex justify-center items-center text-center text-sm text-gray-300">
          © {new Date().getFullYear()} Srii Mandir. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
