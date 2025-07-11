import { Button, Card, CardBody, CardHeader, Input, Select, Textarea } from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import { Card as CardItem } from '../domain/card';
import { useEffect, useState } from "react";
import { getSkills, registerCard } from "../../utils/supabaseFunction";
import { useNavigate } from "react-router";

export function RegisterCard() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState();
  const navigate = useNavigate();

  /**
   * 初期データ(スキル)取得
   */
  useEffect(() => {
    const getData = async() => {
      setLoading(true);
      const skills = await getSkills();
      setSkills(skills);
      setLoading(false);
    }
    getData();
  },[]);

  /**
   * 登録
   * @param data 
   */
  const onSubmit = (data: CardItem) => {
    registerCard(data);
    navigate(`/card/${data.user_id}?success`);
  }

  /**
   * スキル選択
   */
  const handleChange = (e) => {
    setSelectedSkill(e.target.value);
  }

  if (loading) return (<h1>loading..</h1>);
  if (!skills) return (<h1>データがありません</h1>);

  return (
    <>
      <Card>
        <CardHeader>新規登録</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>idに使用する文字列</label>
              <Input  
                type="text"
                placeholder="半角英数字のみ使用可"
                aria-invalid={errors.user_id ? 'true' : 'false'}
                {...register("user_id", { 
                  required: "必須事項です",
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "半角英数字で入力してください"
                  }
                })}
              />
              { errors.user_id && <p style={{ color:"red", margin:"0 10px" }}>idは必須項目です</p> }
            </div>
            <div>
              <label>ユーザ名</label>
              <Input
                type="text"
                placeholder='氏名を入力'
                aria-invalid={errors.name ? 'true' : 'false'}
                {...register("name", { required: true })}
              />
              { errors.name && <p style={{ color:"red", margin:"0 10px" }}>氏名は必須項目です</p> }
            </div>
            <div>
              <label>自己紹介</label>
              <Textarea
                placeholder="<h1>HTMLタグも使用できます</h1>"
                aria-invalid={errors.description ? 'true' : 'false'}
                {...register("description", { required: true })}
              />
              { errors.description && <p style={{ color:"red", margin:"0 10px" }}>自己紹介は必須項目です</p> }
            </div>
            <div>
              <label>スキル</label>
              <Select value={selectedSkill} onChange={handleChange}>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}
                    {...register("skill", { required: true })}
                  >{skill.name}</option>
                ))}
              </Select>
            </div>
            <Button type="submit">登録</Button>
          </form>
        </CardBody>
      </Card>
    </>
  )
}