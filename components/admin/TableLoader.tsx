"use client";

interface Props {
  colSpan: number;
}

export default function TableLoader({ colSpan }: Props) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-8 text-center">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#542452] border-t-transparent rounded-full animate-spin" />
        </div>
      </td>
    </tr>
  );
}
