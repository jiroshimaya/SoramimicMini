/*
======================================================================
Project Name    : Soramimic
File Name       : soramimic.js
Encoding        : utf-8
Creation Date   : 2019/08/19
 
Copyright © 2019 Jiro Shimaya. All rights reserved.
======================================================================

 */
const Constants = (function(){
	const 
	
})();
const SoramimicPublic = (function(){
	const DEFAULT_PARAMETER_VALUES_ = {
			REPEAT: "100",
			SPLITTER: "/",
			DUPLICATE: true,
			SAME_PHRASE_BREAK_REWARD: 1,//文節が一致しているとき掛け算する
			SAME_KANA_REWARD: 1,//同じカナに対して掛け算する
			SAME_VOWEL_REWARD: 1,//同じ母音に対して掛け算する
			SAME_CONSONANT_REWARD: 1,//同じ子音に対して掛け算する
			SAME_BAR_REWARD: 1, //拗音同士に対して掛け算する
			SAME_HATSUON_REWARD: 1, //撥音同士に対して掛け算する(pronunciationではない)
			SAME_SOKUON_REWARD: 1,//促音同士に対して掛け算する
			WORD_NUMBER_PENALTY: 1, //単語数に対するペナルティ
			LENGTH: 1
	}
	const KANA2PHONON_ = {"sp": ["sp", "sp"], "ッ": ["sp", "q"],"ン": ["sp", "N"],
			"ア": ["sp", "a"], "イ": ["sp", "i"], "ウ": ["sp", "u"], "エ": ["sp", "e"], "オ": ["sp", "o"],
			"ウァ": ["w+a", "w-a"],  "ウヮ": ["w+a", "w-a"], "ウィ": ["w+i", "w-i"], "ウェ": ["w+e", "w-e"], "ウォ": ["w+o", "w-o"],
			"カ": ["k+a", "k-a"],"キ": ["k+i", "k-i"],"ク": ["k+u", "k-u"],"ケ": ["k+e", "k-e"],"コ": ["k+o", "k-o"],
			"ガ": ["g+a", "g-a"],"ギ": ["g+i", "g-i"],"グ": ["g+u", "g-u"],"ゲ": ["g+e", "g-e"], "ゴ": ["g+o", "g-o"],
			"キャ": ["ky+a", "y-a"], "キュ": ["ky+u", "y-u"], "キェ": ["ky+e", "y-e"],"キョ": ["ky+o", "y-o"],
			"ギャ": ["gy+a", "y-a"],"ギュ": ["gy+u", "y-u"],"ギェ": ["gy+e", "y-e"],"ギョ": ["gy+o", "y-o"],
			"クァ": ["k+a", "k-a"], "クヮ": ["k+a", "k-a"],"クィ": ["k+i", "k-i"], "クェ": ["k+e", "k-e"], "クォ": ["k+o", "k-o"],
			"グァ": ["g+a", "g-a"], "グヮ": ["g+a", "g-a"],"グィ": ["g+i", "g-i"], "グェ": ["g+e", "g-e"], "グォ": ["g+o", "g-o"],
			"サ": ["s+a", "s-a"],"シ": ["sh+i", "y-i"],"ス": ["s+u", "s-u"], "セ": ["s+e", "s-e"],"ソ": ["s+o", "s-o"],
			"ザ": ["z+a", "z-a"],"ジ": ["j+i", "y-i"],"ズ": ["z+u", "z-u"],"ゼ": ["z+e", "z-e"], "ゾ": ["z+o", "z-o"],
			"シャ": ["sh+a", "y-a"],"シュ": ["sh+u", "y-u"],"シェ": ["sh+e", "y-e"], "ショ": ["sh+o", "y-o"],
			"ジャ": ["j+a", "y-a"], "ジュ": ["j+u", "y-u"], "ジェ": ["j+e", "y-e"], "ジョ": ["j+o", "y-o"],
			"スァ": ["s+a", "s-a"],"スヮ": ["s+a", "s-a"],"スィ": ["s+i", "s-i"],"スェ": ["s+e", "s-e"],"スォ": ["s+o", "s-o"],
			"ズァ": ["z+a", "z-a"], "ズヮ": ["z+a", "z-a"],"ズィ": ["z+i", "z-i"], "ズェ": ["z+e", "z-e"], "ズォ": ["z+o", "z-o"],
			"タ": ["t+a", "t-a"], "チ": ["ch+i", "y-i"], "ツ": ["ts+u", "s-u"], "テ": ["t+e", "t-e"], "ト": ["t+o", "t-o"],
			"ダ": ["d+a", "d-a"], "ヂ": ["d+i", "d-i"], "ヅ": ["d+u", "d-u"],"デ": ["d+e", "d-e"],"ド": ["d+o", "d-o"],
			"チャ": ["ch+a", "y-a"], "チュ": ["ch+u", "y-u"], "チェ": ["ch+e", "y-e"], "チョ": ["ch+o", "y-o"],
			"ヂャ": ["dy+a", "y-a"], "ヂュ": ["dy+u", "y-u"], "ヂェ": ["dy+e", "y-e"], "ヂョ": ["dy+o", "y-o"],
			"ツァ": ["ts+a", "s-a"],"ツヮ": ["ts+a", "s-a"],"ツィ": ["ts+i", "s-i"],"ツェ": ["ts+e", "s-e"],"ツォ": ["ts+o", "s-o"],
			"ティ": ["t+i", "t-i"], "テュ": ["t+u", "t-u"], "トゥ": ["t+u", "t-u"],
			"ディ": ["d+i", "d-i"], "デュ": ["d+u", "d-u"],  "ドゥ": ["d+u", "d-u"],
			"ナ": ["n+a", "n-a"], "ニ": ["n+i", "n-i"], "ヌ": ["n+u", "n-u"], "ネ": ["n+e", "n-e"], "ノ": ["n+o", "n-o"],
			"ニャ": ["ny+a", "y-a"],  "ニュ": ["ny+u", "y-u"], "ニェ": ["ny+e", "y-e"], "ニョ": ["ny+o", "y-o"],
			"ヌァ": ["n+a", "n-a"], "ヌヮ": ["n+a", "n-a"], "ヌィ": ["n+i", "n-i"], "ヌェ": ["n+e", "n-e"], "ヌォ": ["n+o", "n-o"],
			"ハ": ["h+a", "h-a"], "ヒ": ["h+i", "h-i"], "フ": ["f+u", "f-u"], "ヘ": ["h+e", "h-e"], "ホ": ["h+o", "h-o"],
			"バ": ["b+a", "b-a"], "ビ": ["b+i", "b-i"], "ブ": ["b+u", "b-u"], "ベ": ["b+e", "b-e"], "ボ": ["b+o", "b-o"],
			"パ": ["p+a", "p-a"], "ピ": ["p+i", "p-i"], "プ": ["p+u", "p-u"], "ペ": ["p+e", "p-e"], "ポ": ["p+o", "p-o"],
			"ヒャ": ["hy+a", "y-a"], "ヒュ": ["hy+u", "y-u"], "ヒェ": ["hy+e", "y-e"], "ヒョ": ["hy+o", "y-o"],
			"ビャ": ["by+a", "y-a"], "ビュ": ["by+u", "y-u"], "ビェ": ["by+e", "y-e"], "ビョ": ["by+o", "y-o"],
			"ピャ": ["py+a", "y-a"], "ピェ": ["py+e", "y-e"], "ピュ": ["py+u", "y-u"], "ピョ": ["py+o", "y-o"],
			"ファ": ["f+a", "f-a"], "フヮ": ["f+a", "f-a"],"フィ": ["f+i", "f-i"], "フュ": ["hy+u", "y-u"], "フェ": ["f+e", "f-e"], "フォ": ["f+o", "f-o"],
			"ブァ": ["b+a", "b-a"],  "ブヮ": ["b+a", "b-a"],"ブィ": ["b+i", "b-i"], "ブェ": ["b+e", "b-e"], "ブォ": ["b+o", "b-o"],
			"プァ": ["p+a", "p-a"], "プヮ": ["p+a", "p-a"],"プィ": ["p+i", "p-i"], "プェ": ["p+e", "p-e"], "プォ": ["p+o", "p-o"],
			"マ": ["m+a", "m-a"], "ミ": ["m+i", "m-i"], "ム": ["m+u", "m-u"], "メ": ["m+e", "m-e"], "モ": ["m+o", "m-o"],
			"ミャ": ["my+a", "y-a"], "ミュ": ["my+u", "y-u"], "ミェ": ["my+e", "y-e"], "ミョ": ["my+o", "y-o"],
			"ムァ": ["m+a", "m-a"], "ムヮ": ["m+a", "m-a"], "ムィ": ["m+i", "m-i"], "ムェ": ["m+e", "m-e"], "ムォ": ["m+o", "m-o"],
			"ヤ": ["y+a", "y-a"], "ユ": ["y+u", "y-u"], "イェ": ["y+e","y-e"], "ヨ": ["y+o", "y-o"],
			"ラ": ["r+a", "r-a"], "リ": ["r+i", "r-i"], "ル": ["r+u", "r-u"], "レ": ["r+e", "r-e"], "ロ": ["r+o", "r-o"],
			"リャ": ["ry+a", "y-a"], "リュ": ["ry+u", "y-u"], "リェ": ["ry+e", "y-e"], "リョ": ["ry+o", "y-o"],
			"ワ": ["w+a", "w-a"], "ヲ": ["sp", "o"],
			"ヴァ": ["b+a", "b-a"], "ヴヮ": ["b+a", "b-a"],"ヴィ": ["b+i", "b-i"], "ヴ": ["b+u", "b-u"], "ヴェ": ["b+e", "b-e"], "ヴォ": ["b+o", "b-o"]
		}
	const VOWELS_ = ["ア","イ","ウ","エ","オ"];
	const SMALL_VOWELS_ = "ァィゥェォャュョヮ";
	const LARGE_VOWELS_ = "アイウエオヤユヨワ";
	
	//カナを母音に変換するリストを作る
	const KANA2VOWEL_ = (function(){
		const k2r = KANA2PHONON_,
		roma2vowel = zip("アイウエオ","aiueo").reduce((prev,[v1,v2])=>{
			prev[v2] = v1;//aをアに変換する
			return prev;
		},{})
		;
		roma2vowel["p"]="sp";//無音
		roma2vowel["N"]="sp";//撥音の母音は無音とする
		roma2vowel["q"]="sp";//促音の母音は無音とする
		return Object.keys(k2r).reduce((prev,kana)=>{
			const romaVowelOfKana = k2r[kana][1].slice(-1);//kanaのローマ字表記の最後の文字(=母音)を取得
			prev[kana] = roma2vowel[romaVowelOfKana];//kanaを母音カナに変換
			//足してみた20190818
			if("ンッ".includes(kana)){}
			else if(kana == "sp"){}
			else{
				prev[kana+"ー"] = prev[kana];
				if(prev[kana] == "エ")
					prev[kana+"イ"] = prev[kana];
				else if(prev[kana] == "オ")
					prev[kana+"ウ"] = prev[kana];
			}
			return prev;
		},{});		
	})();
	
	//カナを子音に変換するリストを作る
	const KANA2CONSONANT_ = (function(){
		const k2r = KANA2PHONON_;

		return Object.keys(k2r).reduce( (prev,kana) => {
			const romaConsonantOfKana = (k2r[kana][0] == "sp") ? "sp" : k2r[kana][0][0];
			switch(romaConsonantOfKana){
			case "c": prev[kana]="t";//cはtと同じ子音とする
			case "f": prev[kana]="h";//fはhと同じ子音とする
			case "j": prev[kana]="z";//jはzと同じ子音とする
			case "v": prev[kana]="b";//vはbと同じ子音とする
			default: prev[kana]=romaConsonantOfKana;
			}
			return prev;
		},{} );		
	})();
	
	//カナを分割するときの単位を定義
	const KANA_UNITS_ = (function(){
		const k2r = KANA2PHONON_,
		k2v = KANA2VOWEL_;
		return Object.keys(k2r).reduce((prev,kana)=>{
			const vowelOfKana = k2v[kana];
			prev[kana] = [[kana]];
			switch(kana){
			case "ン": case "ッ":
				prev[kana].push([""]);
				break;
			}
			switch(vowelOfKana){
			case "ア": case "イ": case "ウ":	case "エ": case "オ":
				prev[kana+"ー"] = [[kana+"ー"]];//伸ばし棒のユニットを追加する
				prev[kana+"ン"] = [[kana+"ン"]];//ンのユニットを追加する
				prev[kana+"ッ"] = [[kana+"ッ"]];//ッのユニットを追加する
				prev[kana+vowelOfKana] = [[kana+"ー"],[kana,vowelOfKana]];//母音の連続を伸ばし棒化する
				if(vowelOfKana == "エ") prev[kana+"イ"] = [[kana+"ー"],[kana,"イ"]];//eiを伸ばし棒化する
				if(vowelOfKana == "オ") prev[kana+"ウ"] = [[kana+"ー"],[kana,"ウ"]];//ouを伸ばし棒化する
				break;
			}
			return prev;
		},{});		
	})();
	const KANA_UNITS_LIST_ = Object.keys(KANA_UNITS_);
	
	//small母音とlarge母音の変換オブジェクトを作る
	const SMALL2LARGE_ = (function(){
		return zip(SMALL_VOWELS_,LARGE_VOWELS_).reduce((prev,[v1,v2]) => {
			prev[v1] = v2;
			return prev;
		},{});
	})();
	
	const SIMILARITY_ = {
			vowel: loadJsonFile("conf/simVowelsSimple.json"),
			consonant: loadJsonFile("conf/simConsonantsSimple.json")
	}
	const ENGLISH2KANA_ = loadJsonFile("conf/bep-eng.json");//key値のアポストロフィはAPOSTROPHEに変換されている

	
	////parametersに存在しないkeyをthis.DEFAULT_PARAMETER_VALUESを埋めて返す
	const getFormatedParam = parameters => Object.assign(DEFAULT_PARAMETER_VALUES_,parameters);

	//kanaの距離を計算の元を出力する関数
	const getKanaSimilarity = (function(){
		
		const SIMILARITY_BASE_ = (function(){
			const sims = [SIMILARITY_.consonant, SIMILARITY_.vowel],
			k2p = $.extend(true,{},KANA2PHONON_);
			//伸ばし棒を追加
			for(let k1 of Object.keys(k2p)){
			//for(let k1 of k2plist){
				const hasVowel = ("aiueo".includes(k2p[k1][1].slice(-1)));
				//console.log(k1,hasVowel);
				if(hasVowel == true){
					k2p[k1+"ー"] = [k2p[k1][0],k2p[k1][1]+":"];
					//k2p[k1+"ン"] = [k2p[k1][0],k2p[k1][1]+":"];//ンはーと同じ
					//k2p[k1+"ッ"] = k2p[k1];//ッは、なにもないのと同じ
				}
			}
			let k2plist = Object.keys(k2p);
			//return Object.keys(k2p)
			return k2plist
				.reduce( (prev1,k1) => {
					const p1 = k2p[k1];//k1のphonon
					//prev1[k1] = Object.keys(k2p)
					prev1[k1] = k2plist
								.reduce( (prev2,k2) => {
									const p2 = k2p[k2];//k2のphonon
									//if(Object.keys(sims[1]).indexOf(p1[1])<0)
									if(!(p1[1] in sims[1]))
										console.log("k1,p1",k1,p1);
									prev2[k2] = (sims[0][p1[0]][p2[0]]+sims[1][p1[1]][p2[1]])/2;//子音同士、母音同士の類似度の平均をk1とk2の類似度のベースとして定義
									return prev2;
								},{});
					return prev1;
				},{});				
		})();
		
		//同じ文字か判定
		const isSameKana = (kana1,kana2) => kana1 == kana2;
		//同じ母音か判定
		const isSameVowel = (kana1,kana2) => {
			const k2v = KANA2VOWEL_;
			if(kana1 in k2v && kana2 in k2v)
				return k2v[kana1] == k2v[kana2];
			else{
				//console.log("kana is undefined");
				return false;
			}
		}
		//同じ子音か判定
		const isSameConsonant = (kana1,kana2) => {
			const k2c = KANA2CONSONANT_;
			if(kana1 in k2c && kana2 in k2c)
				return k2c[kana1] == k2c[kana2];
			else{
				//console.log("kana is undefined");
				return false;
			}
		}
		//どちらも拗音かどうか
		const isSameBar = (kana1,kana2) => {
			const checkChar = "ー",
				isKana1Ok = ( kana1.slice(-1) == checkChar),
				isKana2Ok = (kana2.slice(-1) == checkChar)
				;
			return (isKana1Ok && isKana2Ok);
		}
		//どちらも促音かどうか
		const isSameSokuon = (kana1,kana2) => {
			const checkChar = "ッ",
				isKana1Ok = ( kana1.slice(-1) == checkChar),
				isKana2Ok = (kana2.slice(-1) == checkChar)
				;
			return (isKana1Ok && isKana2Ok);
		}
		//どちらも撥音かどうか
		const isSameHatsuon = (kana1,kana2) => {
			const checkChar = "ン",
				isKana1Ok = ( kana1.slice(-1) == checkChar),
				isKana2Ok = (kana2.slice(-1) == checkChar)
			;
			return (isKana1Ok && isKana2Ok);
		}


		//パラメータに基づいて微調整する
		return parameter => {
			const param = getFormatedParam(parameter),
			//ksb = $.extend(true,{},kanaSimilarityBase)//値渡し
			ksb = SIMILARITY_BASE_;
			const ksbKeys = Object.keys(ksb);
			const kanaSimilarity = ksbKeys.reduce((prev1,k1)=>{
				prev1[k1] = ksbKeys.reduce((prev2,k2) => {
					let s = ksb[k1][k2];//baseのsimilarityを取得
					if(isSameKana(k1,k2)) s *= param.SAME_KANA_REWARD;
					if(isSameVowel(k1,k2)) s*= param.SAME_VOWEL_REWARD;
					if(isSameConsonant(k1,k2)) s*= param.SAME_CONSONANT_REWARD;
					if(isSameHatsuon(k1,k2)) s*= param.SAME_HATSUON_REWARD;
					if(isSameSokuon(k1,k2)) s*= param.SAME_SOKUON_REWARD;
					prev2[k2] = s;
					return prev2;
				},{});
				return prev1;
			},{});

			return kanaSimilarity;			
		}			
	})();
	
	let TOKENIZER_ = null;
	const buildTokenizer = (function(){
		const KUROMOJI_PATH_ = "js/kuromoji/dict";
		return new Promise(function(resolve,reject){
			kuromoji.builder({dicPath:KUROMOJI_PATH_}).build(function(err, tokenizer){
				if(err) { console.log(err);reject("error:",err); }
				TOKENIZER_ = tokenizer;
				console.log("set tokenizer");
				resolve("ok");
			});
		});
	})();
	
	const loadDatabaseFile = path => {
		const wordlisttext = loadTextFile(path);
		if(wordlisttext == ""){
			return null;
		}
		return loadDatabaseText(wordlisttext);
	}
	
	//kanaListのkeysの単位で文字列を分割する
	const separateKana = kanaStr => {//kanaUnitsはカナのリスト(not object)を想定
		const S2L = SMALL2LARGE_,
			KANA_UNITS_ = KANA_UNITS_LIST_,
			K2V = KANA2VOWEL_,
			//KANA_UNITS_WITH_BAR_ = KANA_UNITS_.filter(v=> (["ー","ッ","ン"].indexOf(v.slice(-1))>=0)),
			LEN_MAX_ = 2
			;
		let result = [],
			i=0;
		kanaStr = kanaStr.replace(/ーー/g, "ー").replace(/ンン/g, "ン").replace(/ッッ/,"ッ");
		let kanaStrLen = kanaStr.length;
		kanaStr += "//";

		while(i<kanaStrLen){
			let p = kanaStr.slice(i,i+LEN_MAX_+1);
			if(p[0] in S2L){
				p = S2L[p[0]] + p.slice(1);
			}
			let moji = "";
			for(let si = LEN_MAX_; si>0; si--){
				let p1 = p.slice(0,si);
				let p2 = p[si];
				if(p1 in K2V){
					if(p2 == "ー"){
						if(K2V[p1] == "エ" && p1[p1.length-1] == "イ")
							moji = p1[0];
						else if(K2V[p1] == "オ" && p1[p1.length-1] == "ウ"){
							moji = p1[0];
						}
						else if(p1 == "ン"){
							result.push(p1);
							i += 1;
							moji = p1;
						}
						else{
							moji = p1+p2;
						}
					}
					else if(p2 == "エ" && K2V[p1] == "エ" && p1[p1.length-1] == "イ")
						moji = p1;
					else if(p2 == "オ" && K2V[p1] == "オ" && p1[p1.length-1] == "ウ")
						moji = p1;
					else if("アイウエオ".includes(p2) && K2V[p1] == p2 && p1[p1.length-1] != "ー")
						moji = p1 + p2;
					else
						moji = p1;
					break;
				}
			}
			if(moji == "")
				break;
			result.push(moji);
			i+=result[result.length-1].length;
		}
		//p = kanaStr.slice(kanaStrLen);
		return result;

	}


	const loadDatabaseText = text => {
		const words = text.split("\n").map(val=>{
			val = val.replace(/\u200B/g, "");//エスケープ処理
			val = val.split("#")[0].split(",");//各行において#以降をコメントアウトして、カンマでスプリット
			return val;
		}).filter(v => (v.length != 0 && v[0] != ""));

		const resultdb = {}
		for(let i = 0; i<words.length;i++){
			const v = words[i];

			if(v.length == 1)v.push(getYomi.only(v[0]));
			const title = v[0];
			for(let v2 of v.slice(1)){
				if(v2.length == 0)console.log("v2",v2);
				const yomi = getYomi.only(v2);
				const sep = separateKana(yomi);
				const ptn = getPronunciationVariation(sep);
				for(let v3 of ptn){
					const v3len = v3.length;
					if(!(v3len in resultdb))resultdb[v3len]=[]
					resultdb[v3len].push([title,v2,v3,i]);
				}
			}
		}
		return resultdb;
	}
	const getYomi = (function(){
		const e2k = ENGLISH2KANA_;
		const S2L = SMALL2LARGE_;
		const k2p = KANA2PHONON_;
		const strApos = "APOSTROPHE";
		
		const getMaResult = strVal => {
			strVal = strVal.toUpperCase();//英語は大文字に直しておく
			strVal = strVal.replace("’","'").replace(/\'/g,strApos);//アポストロフィをAPOSTROPHEにする
			return TOKENIZER_.tokenize(strVal);
		}
		const getYomiAndPhraseBreak = strVal => {
			const maresult = getMaResult(strVal);
			//console.log(maresult);
			let yomi = [];
			const phraseBreak = [];
			for(let v of maresult){
				let tYomi = v.pronunciation;
				if(typeof tYomi === "undefined"){
					tYomi = v.surface_form;
					if(tYomi.match(/^[A-Za-z]*$/)){
						tYomi = tYomi.toUpperCase();
						if(tYomi in e2k)
							tYomi = e2k[tYomi];
						else{
							if(tYomi.includes(strApos) && tYomi != strApos)
								tYomi = tYomi.replace(/APOSTROPHE/g,"");//アポストロフィあるのに辞書に読みがなかった場合、アポストロフィを無視して読む
							tYomi = convertRomanToKana(tYomi);//英単語辞書になかったらローマ字読みする
							console.log("tYomi=",tYomi);
							//それでもアルファベットが残っていればいち文字ずつ読む
							let found = tYomi.match(/[A-Z]/g);//iは大文字小文字無視。
							if(found){
								for(let v of found){
									console.log("found loop v=",v);
									let count = 0;
									while(tYomi.includes(v)){
										tYomi = tYomi.replace(v,e2k[v]);
										if(count>tYomi.length)
											break;
										else
											count += 1;
									}
								}							
							}						
						}
					}
					tYomi = hiraToKana(tYomi);
				}
				tYomi = removeSign(tYomi);//記号削除
				if(tYomi.length > 0){
					if(tYomi[0] in S2L && yomi.length>0){
						if( (yomi[yomi.length-1]+tYomi[0]) in k2p){
							tYomi = yomi.pop() + tYomi;
						}
					}
				}
				tYomi = separateKana(tYomi);//kanaUnitに変換
				if(["名詞","動詞","副詞","形容詞","形容動詞","感動詞"].includes(v.pos)){
					phraseBreak.push(yomi.length);
				}
				yomi = yomi.concat(tYomi);//yomiに結合
			}
			return {"kana":yomi,"phrasebreak":phraseBreak}
		}
		return {
			only: text=>getYomiAndPhraseBreak(text).kana.join(""),
			withBreak: text=>getYomiAndPhraseBreak(text)
		}
	})();
	
	const WORD_LIST_ = {};
	buildTokenizer.then(()=>{
		const WORD_FILE_PATH_ = {
				BASEBALL: "words/baseball.txt",
				//CREATURE: "words/creature.txt",
				NATION: "words/nations.txt",
				PHYSICIST: "words/physicist.txt",
				POKEMON: "words/pokemon.txt",
				SEKITSUI: "words/sekitsui.txt",
				//SHOGI: "words/shogi.txt",
				STATION: "words/stations.txt"
		}
		
		for(let k in WORD_FILE_PATH_){
			const path = WORD_FILE_PATH_[k];
			switch(k){
			case "BASEBALL":case "SEKITSUI":case "STATION":case "PHYSICIST":
			case "POKEMON":case "NATION":
				WORD_LIST_[k] = loadJsonFile("wordsFormatted/"+path.split("/")[1]);
				break;
			default:
				console.log(k);
				WORD_LIST_[k] = loadDatabaseFile(path);
				console.log(JSON.stringify(WORD_LIST_[k]));
				break;
			}
		}

		$(".container-fluid").show();
		$(".loading").remove();		
	});
	
	//母音連続時の変換パターンのリスト("アア"を[["アー"],["ア","ア"]]にするなど)
	const getPronunciationVariation = kana => {
		const kanaUnits = KANA_UNITS_;
		const variations = kana.map(v => {
			//if(Object.keys(kanaUnits).indexOf(v)>=0)
			if(v in kanaUnits)
				return kanaUnits[v];
			else
				return [v];
		});
		return product(...variations)
				.map(v => v.filter(v2=>v2!="").flat())
				.filter(v => v.length != 0);//長さ0の配列は要素に含めない
	}

	//入力にkanaDist下で距離の近い単語を求める
	const getSimilarWord = (kanaDist,wordlist,target,param,length=1) => {
		//console.log(kanaDist);
		const orglen = target.length,
			//Object.keysでは文字列配列が取得できるので、v.lengthも文字列に直してからfilterする
			//cand = this.getPronunciationVariation(target).filter(v=>{return Object.keys(wordlist).indexOf(String(v.length))>=0}),
			cand = getPronunciationVariation(target).filter(v=>{return v.length in wordlist}),
			cand2 = {}
		let	sims = [],
			words = []
			;

		for(let val of cand){
			const tmplength = val.length;
			//if(Object.keys(cand2).indexOf(tmplength)<0)
			if(!(tmplength in cand2))
				cand2[tmplength] = []
			cand2[tmplength].push(val);
		};
		for(let i of Object.keys(cand2)){
			sims = sims.concat(
					wordlist[i].map(w => {
						//console.log("kanaDist",kanaDist);
						const tmplist = cand2[i].map(tar=>ld(kanaDist,tar,w[2])/i);
						return orgRound(Math.min.apply(null,tmplist)*orglen,100);//最小値を見つけて丸める
					})
				);
			//console.log("sims",sims,wordlist[i]);
			words = words.concat(wordlist[i]);
		}
		//console.log("sims",sims);

		return argsort(sims)
				.slice(0,length) //指定された長さまでを切り取る
				.map(val => {
					const tmpW = words[val];
					return [target.join(""), tmpW[1],tmpW[0], sims[val],tmpW[3]];
				});
	}
	
	const soramimi_dp = (text, wordlist, para = {}) => {
		console.time("dpDef1_1");
		const param = getFormatedParam(para);
		console.timeEnd("dpDef1_1");
		console.time("dpDef1_2");
		this.kanaSimilarity = param;
		console.timeEnd("dpDef1_2");
		console.time("dpDef1_3");
		const KANA_SIMILARITY_ = getKanaSimilarity(param);
		const gs = (wordlist,target,length) => getSimilarWord(KANA_SIMILARITY_, wordlist, target, param, length);
		console.timeEnd("dpDef1_3");
		console.time("dpDef1_4");
		const gy = this.getYomi;
		console.timeEnd("dpDef1_4");
		//console.timeEnd("dpDef1");
		console.time("dpDef2");
		const splitter=param.SPLITTER;
		const repeat = param.REPEAT;
		const isDuplicate = param.DUPLICATE;
		const samePhraseBreak = param.SAME_PHRASE_BREAK_REWARD;
		const samaKana = param.SAME_KANA_REWARD;
		const sameVowel = param.SAME_VOWEL_REWARD;
		const sameConsonant = param.SAME_CONSONANT_REWARD;
		const sameBar = param.SAME_BAR_REWARD;
		const sameHatsuon = param.SAME_HATSUON_REWARD;
		const sameSokuon = param.SAME_SOKUON_REWARD;
		const wordsNum = param.WORD_NUMBER_PENALTY;
		const takeLen = param.LENGTH;
		const number = Object.keys(wordlist).map(i => Number(i));
		const phrases = text.split(splitter);
		const phraselen = phrases.length;
		console.timeEnd("dpDef2");
			//phraseの基本的な構造を解析
		console.time("dpDef3");
		    const base_info = phrases.reduce((prev,val)=>{
				prev["raws"].push(val);
				const yomi = SoramimicPublic.getYomiAndPhraseBreak(val);
				//prev["targets"].push(this.separateKana(this.getYomi(val)));
				prev["targets"].push(yomi["kana"]);
				prev["phrasebreak"].push(yomi["phrasebreak"]);
				return prev;
			},{"raws":[],"targets":[],"phrasebreak":[]});
		    const results = ["relativeScores","scores","words"].reduce((prev,val)=>{
				prev[val] = Array(phraselen);
				prev[val].fill([]);
				return prev;
			},{});
		console.timeEnd("dpDef3");

		//base_infoの確認
		for (let v of Object.keys(base_info)){
			console.log(v, base_info[v]);
		}

		const dp = index => {
			const target = base_info["targets"][index],
	        	phraseBreaks = base_info["phrasebreak"][index],
	        	tarlen = target.length,
	        	//used = results["words"].map(v => v.map(v2 => v2.slice(-1)[0])).flat(),//mapやforEachではなぜかだめだった
	        	used = [],
	        	memo = {0:[]},
	        	error = null
	        	;

			//mapやforEachではなぜか参照できなかったので、これを使う
			//console.log("result_word",results["words"][0]);
			for(let v of results["words"]){
				for(let v2 of v)
					//used.push(v2.slice(-1)[0]);
					used.push(v2[v2.length-1]);
			}
			//console.log("used",used);
			console.log("index,tarlen",index,tarlen);

			const dp_inner = t => {
				const mini_result = {"scores":[],"words":[]}
				if(t in memo){
					return memo[t];
				}else{
				}
				console.log("0",JSON.stringify(mini_result));
				for (let i = 0; i<t; i++){
					//console.log("1",JSON.stringify(mini_result));
					//console.log("in_loop i=",i);
					if ( number.includes(t-i) == false ){
						continue
					}

					let words = dp_inner(i);
					if(words === error)
						continue;
					else{
						words = words.slice();
					}

					let score =  words.reduce((s, data) => {return s + data.slice(-2)[0]},0);
					//console.log("score_org",score);
					const currentUsed = words.map(v => v[v.length-1]);
					let newWord = null;
					//console.log("target_out",target);

					for(let w of gs(wordlist,target.slice(i,t),100)){
						//const wid = w.slice(-1)[0];
						const wid = w[w.length-1];
						if(isDuplicate == false && (used.includes(wid) || currentUsed.includes(wid))){
							//console.log("skip: t,i,used,current,w",t,i,used,currentUsed,w);
							continue;
						}
						else{
							//console.log("ok: t,i,used,current,w",t,i,used,currentUsed,w);
						}


						let w2 = w.slice();
						//let wscore = w2.slice(-2)[0];
						let wscore = w2[w2.length-2];
						if(phraseBreaks.includes(t)){
							wscore -= samePhraseBreak*1;
						}
						else{

						}
						w2[w2.length-2] = wscore;
						newWord = [w2,wscore];
						//console.log("wscore",wscore);
						//words.push(w);
						//console.log("newWord",w,wscore,scoreb,score);
						//score += wscore;
						break;
					}
					if(newWord == null)
						continue;
					words.push(newWord[0]);
					score += newWord[1];
					score += words.length*wordsNum;
					mini_result["scores"].push(score);
					mini_result["words"].push(words);
				}
				if(mini_result["scores"].length > 0){
					if(t == tarlen+1){
						const targetstr = target.join("");
						for(let i=0;i<mini_result["scores"].length;i++){
							const resultstr = mini_result["words"][i].map(v=>v[0]).join("");
							if(resultstr != targetstr){
								mini_result["scores"][i]+=10000*t;
							}
						}
						console.log("mini_result",mini_result);
					}
					const arg = argmin(mini_result["scores"]);
					memo[t] = mini_result["words"][arg];
					return memo[t];
				}
				else{
					memo[t] = error;
					console.log("memo error");
					return memo[t];
				}

			}
			return dp_inner(tarlen+1);
		}

		//progressBarの初期値設定
		//const bar = $(".progress-bar.convert-progress");
		const bar = $(".span-progress");
		bar.html("0/"+String(phraselen));
		$(".div-result").html("");

		let dpIndex = 0;

		//dpをset_timeoutで実行するための関数
		const dp_outer = i => {
			if(i>=phraselen || i<0){
				//bar.css("width","26%");
				const result = results["words"];
				console.log(result);
				if(result.length == 0){
					$(".loading2").hide();
					$(".div-result").html("うまく変換できる単語を見つけられませんでした");
					return;
				}
				let resultText = result.map(v=>{
					return v.reduce((prev2,v2)=>{
						prev2[0].push(v2[0]);//org
						prev2[1].push(v2[1]);//yomi
						prev2[2].push(v2[2]);//word
						return prev2
					},[[],[],[]])
					.map(v=>v.join("/"))
					.concat([""])
					;
				})
				.flat()//平坦化
				;

				$(".div-result").html(resultText.join("<br>"));
				$(".loading2").hide();

				return results;
			}

			console.time("dp_"+String(i));
			const r = dp(i);
			//$("body").append("<div>"+String(i)+"</div>");
			console.log(r);
			if ( r != null)
				results["words"][i] = r;
			//progressBarの変更
			const percentStr = String(orgRound((i+1)*100/phraselen,1))+"%";
			bar.html(String(i+1)+"/"+String(phraselen));
			setTimeout(function(){
				dp_outer(i+1);
			},0);
		}
		setTimeout(function(){
			dp_outer(0);
		},0);
	}

	const setWordListOriginal = text => {
		WORD_LIST_["ORIGINAL"] = loadDatabaseText(text);
	}

	


	const setKanaSimilarity = param => {
		console.log("set param:",JSON.stringify(param));
		//this.KANA_SIMILARITY_ = this.getKanaSimilarity(this.KANA_SIMILARITY_BASE_, param);
		KANA_SIMILARITY_ = SoramimicPublic.getKanaSimilarity(param);
	}

	//文字列sとtのkanaDist下での置換コストを求める
	const ld = (kanaDist,s,t) => {
		if(typeof s === "undefined" ||  typeof t === "undefined")
			console.log("ld",s,t);
		//console.log("ld_kanadist",kanaDist);
		return zip(s,t).reduce((prev,[v1,v2])=> {
			if(!(v1 in kanaDist)){
				console.log(v1);
				return prev+100;
			}else if(!(v2 in kanaDist[v1])){
				console.log(v2);
				return prev+100;
			}
			else{
				prev += kanaDist[v1][v2];
				return prev;
			}
			},0);
	}
	//デフォルトのパラメータをセット


	
	return {
		getKanaToPhonon: ()=>KANA2PHONON_,
		getDefaultParam: ()=> DEFAULT_PARAMETER_VALUES_,
		getVowels: ()=> VOWELS_,
		getSmallVowels: ()=>SMALL_VOWELS_,
		getLargeVowels: ()=>LARGE_VOWELS_,
		getKanaToVowel: ()=>KANA2VOWEL_,
		getKanaToConsonant: ()=>KANA2CONSONANT_,
		getKanaUnits: ()=>KANA_UNITS_,
		getSmallToLarge: ()=>SMALL2LARGE_,
		getVowelSimilarity: ()=>SIMILARITY_.vowel,
		getConsonantSimilarity: ()=>SIMILARITY_.consonant,
		getEnglishToKana: ()=>ENGLISH2KANA_,
		getFormatedParam: param=>getFormatedParam(param),
		getKanaSimilarity: param=>getKanaSimilarity(param),
		getYomiAndPhraseBreak: text=>getYomi.withBreak(text),
		getWordList: ()=>WORD_LIST_,
		makeSoramimi: (text, wordlist, para = {})=>soramimi_dp(text, wordlist, para),
		setWordListOriginal: text=>setWordListOriginal(text)
		
	}
	
})();