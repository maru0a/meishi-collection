import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { getCardById } from "../../utils/supabaseFunction"
import { Card, CardBody, CardHeader } from "@chakra-ui/react";

export function ProfileCard() {
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [card, setCard] = useState();

  /**
   * データ取得
   */
  useEffect(() => {
    if (!id) return;
    const getCard = async () => {
      setLoading(true);
      const item = await getCardById(id);
      setCard(item);
      setLoading(false);
    }
    getCard();
  },[id])

  if (loading) return (<h1>loading..</h1>);
  if (!card) return (<h1>データがありません</h1>);

  return (
    <>
      <Card>
        <CardHeader>{card.name}</CardHeader>
        <CardBody>
          <h2>user_id：{card.user_id}</h2>
          <h2>name：{card.name}</h2>
          <h2>skill：{card.skill}</h2>
          <h2>description：{card.description}</h2>
          { card.qiita_id &&  (<h2><a href={`https://qiita.com/${card.qiita_id}`} target="__blank">Qiita</a></h2>) }
          { card.x_id && (<h2><a href={`https://x.com/${card.x_id}`} target="_blank">X</a></h2>) }
        </CardBody>
      </Card>
    </>
  )
}