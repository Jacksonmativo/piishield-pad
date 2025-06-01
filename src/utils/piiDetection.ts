import { PiiPatterns, PiiMappings } from '@/types/pii';

export const PII_PATTERNS: PiiPatterns = {
  name: {
    pattern: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
    color: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/40',
    placeholder: 'NAME'
  },
  email: {
    pattern: /\b[\w\.-]+@[\w\.-]+\.\w+\b/g,
    color: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    placeholder: 'EMAIL'
  },
  phone: {
    pattern: /(\+(?:93|355|213|1-684|376|244|1-264|672|1-268|54|374|297|61|43|994|1-242|973|880|1-246|375|32|501|229|1-441|975|591|387|267|55|246|1-284|673|359|226|257|855|237|1|238|599|1-345|236|235|56|86|61|61|57|269|243|242|682|506|385|53|599|357|420|45|253|1-767|1-809|593|20|503|240|291|532|268|251|500|298|679|358|33|594|689|241|220|995|49|233|350|30|299|1-473|590|1-671|502|44-1481|224|245|592|509|504|852|36|354|91|62|98|964|353|44-1624|972|39|225|1-876|81|44-1534|962|7|254|686|383|965|996|856|371|961|266|231|218|423|370|352|853|261|265|60|960|223|356|692|596|222|230|262|52|691|373|377|976|382|1-664|212|258|95|264|674|977|31|687|64|505|227|234|683|672|850|389|1-670|47|968|92|680|970|507|675|595|51|63|48|351|1-787|974|262|40|7|250|590|290|1-869|1-758|590|508|1-784|685|378|239|966|221|381|248|232|65|1-721|421|386|677|252|27|82|211|34|94|249|597|46|41|963|886|992|255|66|670|228|690|676|1-868|216|90|993|1-649|688|1-340|256|380|971|44|1|598|998|678|39|58|84|681|212|967|260|263)[-.\s]?)?\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    color: 'bg-[#1F6E8C]/20 text-blue-200 border-blue-400/40',
    placeholder: 'PHONE'
  },
  address: {
    pattern: /\b\d{1,5} \w+ (Street|St|Avenue|Ave|Road|Rd)\b/g,
    color: 'bg-[#2E8A99]/20 text-cyan-200 border-cyan-400/40',
    placeholder: 'ADDRESS'
  },
  creditCard: {
    pattern: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
    color: 'bg-[#84A7A1]/20 text-green-200 border-green-400/40',
    placeholder: 'CREDIT_CARD'
  },
  ssn: {
    pattern: /\b\d{3}-\d{2}-\d{4}\b/g,
    color: 'bg-[#0E2954]/20 text-blue-200 border-blue-400/40',
    placeholder: 'SSN'
  },
  website: {
    pattern: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    color: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    placeholder: 'WEBSITE'
  },
  subdomain: {
    pattern: /https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\.[a-zA-Z]{2,}(?:\/[^\s]*)?/g,
    color: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    placeholder: 'SUBDOMAIN'
  },
  ipAddress: {
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    color: 'bg-teal-500/20 text-teal-200 border-teal-400/40',
    placeholder: 'IP_ADDRESS'
  },
  company: {
    pattern: /\b[\w\.-]+\.(aaa|aarp|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|actor|ad|ads|adult|ae|ac\.ae|co\.ae|gov\.ae|mil\.ae|net\.ae|org\.ae|sch\.ae|aeg|aero|cargo\.aero|charter\.aero|aetna|af|com\.af|edu\.af|gov\.af|net\.af|org\.af|afl|africa|ag|co\.ag|com\.ag|net\.ag|nom\.ag|org\.ag|agakhan|agency|ai|com\.ai|net\.ai|off\.ai|org\.ai|aig|airbus|airforce|airtel|akdn|al|com\.al|edu\.al|net\.al|org\.al|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|co\.am|com\.am|net\.am|north\.am|org\.am|radio\.am|south\.am|amazon|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|co\.ao|it\.ao|aol|apartments|app|apple|aq|aquarelle|ar|com\.ar|int\.ar|net\.ar|org\.ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|co\.at|or\.at|athleta|attorney|au|asn\.au|com\.au|id\.au|info\.au|net\.au|org\.au|auction|audi|audible|audio|auspost|author|auto|autos|aw|com\.aw|aws|ax|axa|az|biz\.az|co\.az|com\.az|edu\.az|gov\.az|info\.az|int\.az|mil\.az|name\.az|net\.az|org\.az|pp\.az|pro\.az|azure|ba|co\.ba|com\.ba|baby|baidu|banamex|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|co\.bb|com\.bb|net\.bb|org\.bb|bbc|bbt|bbva|bcg|bcn|bd|ac\.bd|com\.bd|net\.bd|org\.bd|be|beats|beauty|beer|berlin|best|bestbuy|bet|bf|bg|bh|biz\.bh|cc\.bh|com\.bh|edu\.bh|me\.bh|name\.bh|net\.bh|org\.bh|bharti|bi|co\.bi|com\.bi|edu\.bi|info\.bi|mo\.bi|net\.bi|or\.bi|org\.bi|bible|bid|bike|bing|bingo|bio|biz|auz\.biz|bj|com\.bj|black|blackfriday|blockbuster|blog|bloomberg|blue|bm|com\.bm|net\.bm|org\.bm|bms|bmw|bn|com\.bn|net\.bn|org\.bn|bnpparibas|bo|com\.bo|net\.bo|org\.bo|tv\.bo|boats|boehringer|bofa|bom|bond|boo|book|booking|bosch|bostik|boston|bot|boutique|box|br|abc\.br|adm\.br|adv\.br|agr\.br|am\.br|aparecida\.br|app\.br|arq\.br|art\.br|ato\.br|belem\.br|bhz\.br|bib\.br|bio\.br|blog\.br|bmd\.br|boavista\.br|bsb\.br|campinas\.
