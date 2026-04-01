import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentMutation } from "@/features/api/purchaseApi";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get("courseId");
  const sessionId = searchParams.get("session_id");

  const [verifyPayment, { isLoading, isSuccess, isError, error }] =
    useVerifyPaymentMutation();

  useEffect(() => {
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [sessionId]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Payment verified! Redirecting to your course...");
      // Small delay so user sees the success state
      setTimeout(() => {
        navigate(`/course-progress/${courseId}`, { replace: true });
      }, 1500);
    }
    if (isError) {
      toast.error(error?.data?.message || "Payment verification failed");
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {isLoading && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-gray-500">Please wait while we confirm your purchase.</p>
        </>
      )}
      {isSuccess && (
        <>
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h2 className="text-xl font-semibold text-green-600">Payment Verified!</h2>
          <p className="text-gray-500">Redirecting to your course...</p>
        </>
      )}
      {isError && (
        <>
          <XCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-red-600">Payment Verification Failed</h2>
          <p className="text-gray-500">
            {error?.data?.message || "Something went wrong. Please contact support."}
          </p>
          <button
            onClick={() => navigate(`/course-detail/${courseId}`)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go back to course
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentVerify;
