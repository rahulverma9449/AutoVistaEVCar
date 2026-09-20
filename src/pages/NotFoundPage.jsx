import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
function NotFoundPage() {
  return <Container className="min-h-[80vh] flex items-center justify-center py-12 mt-20"><div className="max-w-md w-full text-center"><AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-6" /><h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
          Page Not Found
        </h1><p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p><div className="flex flex-col sm:flex-row justify-center gap-4"><Button asChild variant="default" className="flex items-center gap-2"><Link to="/"><Home className="h-4 w-4" />
              Back to Home
            </Link></Button><Button
    asChild
    variant="outline"
    className="flex items-center gap-2"
    onClick={() => window.history.back()}
  ><Link to="#" onClick={(e) => {
    e.preventDefault();
    window.history.back();
  }}><ArrowLeft className="h-4 w-4" />
              Go Back
            </Link></Button></div></div></Container>;
}
export {
  NotFoundPage as default
};
