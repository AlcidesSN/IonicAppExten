export interface Ficha {
  hpAtual:number,
  hpMax:number,
  xpAtual:number,
  xpNextNivel:number,
  for:number,
  des:number,
  con:number,
  int:number,
  sab:number,
  car:number,
  pericias: Pericias,
  equipamentos:Equipamento[],
}

export interface Pericias{
  acrobacia:boolean,
  arcanismo:boolean,
  atletismo:boolean,
  atuacao:boolean,
  enganacao:boolean,
  furtividade:boolean,
  hitoria:boolean,
  intimidacao:boolean,
  intuicao:boolean,
  investigacao:boolean,
  lidarComAnimais:boolean,
  medicina:boolean,
  natureza:boolean,
  persepcao:boolean,
  persuasao:boolean,
  prestidigitacao:boolean,
  religiao:boolean,
  sobrevivencia:boolean
}

export interface Equipamento{
  nome_Equipamento:string,
  descricao:string,
  dano:string,
  alcance:string,
  propriedades:string
}
