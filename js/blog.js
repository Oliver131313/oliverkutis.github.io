'use strict';

/* --------------------- Define functions --------------------- */
const sortArticles = function (articles) {
	/* 
		Sort articles by date 
	*/
	let arrayArticles = [];
	for (let article in articles) {
		arrayArticles.push([article, articles[article].date]);
	}

	arrayArticles.sort((a, b) => {
		return new Date(b[1]) - new Date(a[1]);
		// return new Date(a.date) - new Date(b.date);
	});
	console.log(arrayArticles);

	const articlesSorted = {};
	arrayArticles.forEach((article) => {
		articlesSorted[article[0]] = articles[article[0]];
	});

	return articlesSorted;
};

const listRecentPostsBlog = function (articles) {
	const listSidebar = document.querySelector('.list-sidebar');
	if (!listSidebar) return;
	const articlesSorted = sortArticles(articles);
	let html = ``;
	// OBMEDZI POCET PRISPEVKOV NA 3
	// let articlesNum = 0;
	for (let art in articlesSorted) {
		const articleObj = articlesSorted[art];
		const articleTitle = articleObj.title;
		const articleSubTitle = articleObj.subtitle;
		const articleTitleFull = articleTitle + ': ' + articleSubTitle;
		const articleUrl = articleObj.url;

		html += `<li><a href=${articleUrl}>${articleTitleFull}</a></li>`;
	}

	// if (articlesNum <= 3)
	listSidebar.innerHTML = html;
};

const listArticlesBlog = function (articles) {
	/* 
		List all articles on the page
	*/
	const blogContainer = document.querySelector(
		'#blogMain > .container > .row > .col-md-8'
	);
	if (!blogContainer) return;

	let html = ``;

	const articlesSorted = sortArticles(articles);
	// Loop through the articles
	for (let art in articlesSorted) {
		let articleObj = articlesSorted[art]; // get the article details object
		// get the date created and format it
		const date = new Date(articleObj.date);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const dateLocale = date.toLocaleDateString('sk-SK', options);

		// create the html for the article
		html += `<div class="article-box">
					<div class="article-thumb">
					</div>
					<div class="article-meta">
						<h1 class="article-title"><a href=${articleObj.url}>${articleObj.title}</a></h1>
						<h2 class="article-subtitle">${articleObj.subtitle}</h2>
						<ul>
							<li><span class="ion-ios-person"><a href="#"> ${articleObj.author}</a></span></li>
							<li><span class="ion-pricetag"><a href="#"> ${articleObj.category}</a></span></li>
							<li><span class="ion-ios-calendar"><a href="#"> ${dateLocale}</a></span></li>
						</ul>
					</div>
					<div class="article-description">
						<p>${articleObj.description}</p>
					</div>
				</div>`;
	}
	// add the html to the page
	blogContainer.innerHTML = html;
};

const listArticlesMain = function (articles) {
	/*
		List 3 last articles on the main page
	*/
	const mainBlogContainer = document.querySelectorAll(
		'#blog > .container > .row'
	)[1];
	if (!mainBlogContainer) return;

	let html = ``;

	const articlesSorted = sortArticles(articles);
	const articlesArray = Array.from(Object.entries(articlesSorted)).slice(
		0,
		3
	);
	// Loop through the articles
	articlesArray.forEach((article) => {
		let articleObj = article[1]; // get the article details object

		// create the html for the article box on the main page
		html += `<div class="col-md-4">
					<div class="card card-blog">
						<div class="card-img">
							<a href=${articleObj.url}
								><img
									src=${articleObj.img}
									alt=""
									class="img-fluid"
							/></a>
						</div>
						<div class="card-body">
							<div class="card-category-box">
								<div class="card-category">
									<h6 class="category">${articleObj.category}</h6>
								</div>
							</div>
							<h3 class="card-title">
								<a href="blog-scm-01.html"
									><u>${articleObj.title}:</u> 
									<br />${articleObj.subtitle}
									</a
									>
							</h3>
							<p class="card-description">
								${articleObj.description}
							</p>
						</div>
						<div class="card-footer">
							<div class="post-author">
								<a href="#">
									<img
										src="img/profile-photo-no-background.png"
										alt=""
										class="avatar rounded-circle"
									/>
									<span class="author"
										>${articleObj.author}</span
									>
								</a>
							</div>
							<div class="post-date">
								<span class="ion-ios-clock-outline"></span>
								5 min.
							</div>
						</div>
					</div>
				</div>`;
	});
	// add the html to the page
	mainBlogContainer.innerHTML = html;
};

// Get the articles from the JSON file and list them on the page
$.getJSON('articles.json', (data) => {
	console.log(data);
	window.data = data;
	listArticlesMain(data);
	listArticlesBlog(data);
	listRecentPostsBlog(data);
});

// const articles = {
// 	'blog-scm-01': {
// 		name: 'blog-scm-01',
// 		fileName: 'blog-scm-01.html',
// 		date: '2023-01-20',
// 		url: 'blog-scm-01.html',
// 		author: 'Oliver Kutiš',
// 		title: 'INKREMENTALITA - INTRO (pt. 1)',
// 		subtitle: 'Kvázi-exprimentálne metódy a ich využitie v marketingu',
// 		category: 'Inkrementalita',
// 		tags: ['Data Science', 'Inkrementalita', 'Marketing', 'Kauzalita'],
// 		description:
// 			'Prečo pre vyhodnotenie väčších a dôležitých kampaní nie je vhodné spoliehať sa na dáta z Google Analytics?',
// 	},
// 	'blog-scm-02': {
// 		name: 'blog-scm-02',
// 		fileName: 'blog-scm-02.html',
// 		date: '2023-02-01',
// 		url: 'blog-scm-02.html',
// 		author: 'Oliver Kutiš',
// 		title: 'INKREMENTALITA - INTRO (pt. 2)',
// 		subtitle: 'Metóda syntetickej kontrolnej premennej',
// 		category: 'Inkrementalita',
// 		tags: ['Data Science', 'Inkrementalita', 'Marketing', 'Kauzalita'],
// 		description:
// 			'Praktický príklad využitia kvázi-kauzálnych metód na vyhodnotenie vplyvu kampane.',
// 	},
// };

// listArticlesBlog(); // call the function to list all articles on the page

// document.querySelector(
// 	'#blogMain > .container > .row > .col-md-8'
// ).innerHTML = `<div class="article-box">
// 		<div class="article-thumb">
// 		</div>
// 		<div class="article-meta">
// 			<h1 class="article-title">INKREMENTALITA - INTRO (pt. 1): Kvázi-exprimentálne metódy a ich využitie v marketingu</h1>
// 			<ul>
// 				<li><span class="ion-ios-person"><a href="#">Oliver Kutiš</a></span></li>
// 				<li><span class="ion-pricetag"><a href="#">Inkrementalita</a></span></li>
// 			</ul>
// 		</div>
// 		<div class="article-description">
// 			<p>Prečo pre vyhodnotenie väčších a dôležitých kampaní nie je vhodné spoliehať sa na dáta z Google Analytics?</p>
// 		</div>
// 	</div>`;

// @Jakub Nožička
// Pokial sme co sa tyka kampani na tom dobre, tak si myslim, ze tuto cast nebude potrebne nejak hlbsie skumat.
// Ovela vacsi zmysel by davalo pozriet sa na predajnost jednotlivych produktov, kategorii a ich marze. To vsak obsahuje komplikaciu.

// V sucasnej chvili je jedinou moznostou sa pozriet na data z Google Analyics pre vsertky eshopy a potom si naparovat marze ku produktovym IDs. Osobne si nemyslim, ze by to bol dobry pristup, pretoze tam v priebehu roka doslo ku obrovskej strate dat. Ina moznost je poprosit klienta o data z CRM ku jednotlivym produktom / kategoriam v case s ich cenami a marzami.
// Cela tato analyza je vsak trosku obmedzena, pretoze nevieme ani ake vysledky mal klient predtym a moze byt tazsie sa pozriet co robil lepsie / horsie a co mohlo sposobit nepriaznivy vyvoj.

// Osobne by som pre takyto monitoring a BI odporucil @Jakub Kalab. Jednorazova analyza moze priniest insighty ale to, ze ju klient pozaduje naznacuje, ze ma v datach neporiadok a nema prehlad. Tu je vsak otazkou, ci chce klient investovat do dlhodobeho riesenia obzvlast teraz ked je v strate.

// Poslednou moznostou, ktora by mohla mat prinos by mohlo byt optimalizovanie reklamy na marze a nie na ceny. To by vyzadovalo upravy merania (pripadne nasadenie server-side GTM). Neviem vsak povedat presne aky by to malo prinos. Viem, ze to aplikujeme u sanitina. Mozno by vedel @Lukas Vozda viac.

// Zaujimalo by ma to, co znamenaju nevhodne opatrenia, ktore klient vykonava.

// Podla moznosti, ktore uvadzam vyssie by som asi fakt radsej odporucil konzultaciu s @Jakub Kalab predtym nez das klientovi nejaku odpoved. Necitim sa kvalifikovane ani na casovy odhad a Kubo ma s tymto viac skusenosti. Ak to je moc akutne, tak mu asi mozes brnknut. Je na Czech Online Expo v Prahe ale vystup by mal mat az zajtra 🙂

// cc @Tomáš Netík (away through Monday)

// Dobre Tome, maj sa pekne a uzi si dovolenou :slightly_smiling_face:
// Mozno potom len mrkni na moju odpoved pre @Jakub Nožička k tomuto tasku: https://app.asana.com/0/0/1203993272706942/f
