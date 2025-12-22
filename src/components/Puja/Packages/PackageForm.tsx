import SelectedPackageSummary from "./SelectedPackageSummary";
import PujaDetailsForm from "./Form";

export default function PackageForm() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT FORM */}
          <div className="lg:col-span-2">
            <PujaDetailsForm />
          </div>

          {/* RIGHT SUMMARY */}
          <div className="lg:col-span-1">
            <SelectedPackageSummary />
          </div>

        </div>
      </div>
    </div>
  );
}
