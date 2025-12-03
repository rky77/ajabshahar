import loaderAnimation from '../public/spinner.gif';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img src={loaderAnimation.src} alt="Loading..." width={300} height={300} />
    </div>
  );
}
