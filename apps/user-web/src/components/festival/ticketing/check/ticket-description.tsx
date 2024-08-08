export default function TicketDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="w-full">
      <h3 className="text-16 font-semibold mb-4">상세 정보</h3>
      <p className="text-13 font-medium">{description}</p>
    </div>
  );
}
