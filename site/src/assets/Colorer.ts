export default function Colorer(login: string | undefined): string {
  //
  if (login === undefined) {
    return "bg-cyan-500 dark:bg-gray-700";
  }
  // Choose you own colors for normal theme and dark theme and add your switch case, dont touch anything else
  // https://tailwindcss.com/docs/customizing-colors
  // https://tailwindcss.com/docs/background-color
  //
  switch (login) {
    case "jjaqueme":
      return "bg-orange-400 dark:bg-orange-900";

    default:
      return "bg-cyan-500 dark:bg-gray-700";
  }
}
