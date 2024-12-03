import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Link } from "react-router";

export const Header = () => {
  return (
    <header>
      <Card className="p-4 rounded-0">
        <div className="container mx-auto flex justify-between">
          <h1 className="font-bold text-2xl">RSC Labs тестовое задание</h1>
          <Link to="/add">
            <Button>Добавить заметку</Button>
          </Link>
        </div>
      </Card>
    </header>
  );
};
