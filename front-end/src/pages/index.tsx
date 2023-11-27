import GameBoard from "@/components/GameBoard";
import MainLayout from "@/layouts/MainLayout";

export default function index() {
  return (
    <MainLayout>
      <div>
        <GameBoard />
      </div>
    </MainLayout>
  );
}
