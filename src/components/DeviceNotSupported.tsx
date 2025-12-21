function DeviceNotSupported() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
      <div className="text-center px-6 max-w-md">
        <h1 className="text-2xl font-semibold mb-4">
          This width of device is not supported
        </h1>
        <p className="text-gray-500">
          Please access the application from a device with a larger screen.
        </p>
      </div>
    </div>
  );
}

export default DeviceNotSupported;
