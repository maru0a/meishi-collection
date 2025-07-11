// import { Record } from "../src/domain/record";
import { Card } from "../src/domain/card";
import { supabase } from "./supabase";

export const getCardById = async (id:string) => {
  const userData = await supabase.from("users").select("*").eq("user_id", id).single();
  if (!userData.data) {
    console.error("response.data is null or undefined");
    return [];
  }

  const userId = userData.data["user_id"];

  // users.user_id に紐付くuser_skillテーブルのデータを取得
  const userSkillData = await supabase.from("user_skill").select("*").eq("user_id",userId).single();

  if (!userSkillData.data) {
    console.error("response.data is null or undefined");
    return [];
  }

  const skillId = userSkillData.data["skill_id"];

  // user_skill に紐付くskillテーブルのデータを取得
  const skillData = await supabase.from("skill").select("*").eq("id",skillId).single();

  if (!skillData.data) {
    console.error("response.data is null or undefined");
    return [];
  }

  return new Card(
    userData.data["user_id"], 
    userData.data["name"],
    skillData.data["name"],
    userData.data["description"],
    userData.data["github_id"],
    userData.data["qiita_id"],
    userData.data["x_id"],
  );
}

export const getSkills = async() => {
  const response = await supabase.from("skill").select("*");
  const skills = response.data!.map((skill: any) => ({
      id: skill.id, 
      name: skill.name
  }));
  return skills;
}

export const registerCard = async (card) => {
  await supabase
    .from("users")
    .insert({
      user_id: card.user_id,
      name: card.name,
      description: card.description,
      github_id: card.github_id ?? null,
      qiita_id: card.qiita_id ?? null,
      x_id: card.x_id ?? null
    });
    
  await supabase
    .from("user_skill")
    .insert({
      user_id: card.user_id,
      skill_id: parseInt(card.skill),
    }); 
}
