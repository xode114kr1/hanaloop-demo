"use client";

type DashboardErrorStateProps = {
  message: string;
  onRetry: () => void;
  title: string;
};

function getDisplayMessage(message: string) {
  if (message === "Fetch failed") {
    return "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return message;
}

export function DashboardErrorState({
  message,
  onRetry,
  title,
}: DashboardErrorStateProps) {
  return (
    <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-lg border border-(--error-container) bg-(--error-container) p-6 text-center text-(--on-error-container)">
      <p className="text-sm font-bold">{title}</p>
      <p className="mt-2 max-w-md text-sm font-medium">
        {getDisplayMessage(message)}
      </p>
      <button
        className="mt-4 rounded-md bg-(--surface-container-lowest) px-4 py-2 text-sm font-bold text-(--on-error-container) transition hover:bg-white"
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}
