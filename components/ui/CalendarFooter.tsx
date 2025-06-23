import { Button } from './button';

type CalendarFooterType = {
  onDateSelect: (date: Date | undefined) => void
  selectedDate?: Date
  onCancel: () => void
};

export default function CalendarFooter({ onDateSelect, selectedDate, onCancel }
  : CalendarFooterType) {
  return (
    <tbody className="mt-2 pt-2 border-t border-calendar-border">
      <tr>
        <td className="w-full flex items-center justify-end">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-prly-black rounded-full hover:border-calendar-border bg-transparent px-2 hover:bg-transparent hover:border flex items-center justify-center font-medium mr-2 h-8">Cancel</Button>
          <Button type="button" onClick={() => onDateSelect(selectedDate)} size="icon" className="text-prly-black rounded-full hover:text-white bg-transparent hover:bg-prly-black flex items-center justify-center font-medium h-8">Ok</Button>
        </td>
      </tr>
    </tbody>
  );
}
