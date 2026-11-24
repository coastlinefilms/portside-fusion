// Portside Fusion winter menu (Portside_Winter_Menu_26.pdf).
// To update the menu, edit this file only. Prices are shown as on the printed menu (no $).

export type Tag = 'V' | 'GF';
export type Item = { name: string; price: string; desc?: string; tags?: Tag[] };
export type Category = { title: string; note?: string; items: Item[] };

export const menuColumns: Category[][] = [
  [
    {
      title: 'For the table',
      items: [
        { name: 'Chilled Seafood Tower', price: 'MP', tags: ['GF'], desc: '6 East Coast oysters, 5 butterflied jumbo tiger shrimp, 2 pc of Alaskan king crab, 3 pc Atlantic lobster tail, scallop ceviche, flying fish roe' },
        { name: 'Bread Basket', price: '9', tags: ['V'], desc: 'Freshly baked house focaccia, marinated olives' },
      ],
    },
    {
      title: 'To start',
      items: [
        { name: 'Oysters', price: '6 - 24\n12 - 42', tags: ['GF'], desc: 'PEI oysters on the half shell, lemon wedge, vinaigrette, horseradish' },
        { name: 'Bruschetta', price: '14', desc: 'Olive oil & oregano marinated heirloom tomatoes, balsamic glaze, goat cheese, toasted focaccia' },
        { name: 'GBC', price: '18', desc: 'Garlic bread with cheese on homemade focaccia' },
        { name: 'Mussels', price: '22', desc: 'Spicy steamed PEI mussels, Mexican chorizo broth, toasted bread' },
        { name: 'Beef Tartare', price: '32', desc: 'Anchovy, capers, shallots, dijon, chives, worcestershire, egg yolk, horseradish mayo, crostini' },
        { name: 'Grilled Octopus', price: '29', tags: ['GF'], desc: 'Grilled western rock octopus, greek salad, whipped feta' },
        { name: 'Baked Brie', price: '22', desc: 'Pistachio crusted cream brie, cranberry compote, apple slaw, crostini' },
        { name: 'Handcrafted Arancini', price: '26', desc: 'Filled with mozzarella, topped with marinara sauce and parmesan' },
      ],
    },
  ],
  [
    {
      title: 'Salads',
      items: [
        { name: 'House Salad', price: '19', desc: 'Lime and truffle honey vinaigrette, strawberries, pineapple, candied walnuts, feta cheese, harvest greens' },
        { name: 'Garden Salad', price: '16', tags: ['V', 'GF'], desc: 'Cucumber, bell pepper, red onion, carrot, thousand island dressing' },
        { name: 'Portside Wedge', price: '14', tags: ['GF'], desc: 'Iceberg lettuce, blue cheese dressing, heirloom tomatoes' },
        { name: 'Vegan Caesar', price: '12', tags: ['V', 'GF'], desc: 'Avocado oil and garlic dressing, plant based parmesan, crushed black pepper' },
      ],
    },
    {
      title: 'Soups',
      items: [
        { name: 'New England Seafood Chowder', price: '19', desc: 'Potato and bacon cream, lobster, mussels, shrimp, scallops, halibut' },
        { name: 'French Onion Soup', price: '19', desc: 'Caramelized onion, beef broth, crouton, Swiss cheese' },
      ],
    },
    {
      title: 'Sea',
      items: [
        { name: 'Halibut', price: '64', tags: ['GF'], desc: 'Maple soy baked wild-caught halibut, fresh pineapple salsa, pave potatoes, seasonal vegetables' },
        { name: 'Fish ’n’ Chips', price: '24', desc: 'Beer battered fresh Georgian Bay pickerel, beef tallow fries, mushy peas, tartar sauce, coleslaw' },
      ],
    },
    {
      title: 'Pasta',
      items: [
        { name: 'Portside Power Bowl Broth', price: '39', desc: 'Coconut milk, red Thai curry beef bone broth, basmati rice' },
        { name: 'Rigatoni Bolognese', price: '32', desc: 'Classic Italian meat sauce with veal, beef, and pork' },
        { name: 'Mushroom Fettucine', price: '36', desc: 'Roasted mushrooms, porcini cream, shaved Grana Padano, white truffle' },
        { name: 'Luciano’s Seafood Linguine', price: '48', desc: 'White wine tomato bisque sauce with mussels, shrimp, scallops, lobster, and halibut' },
      ],
    },
  ],
  [
    {
      title: 'Land',
      items: [
        { name: 'Classic Steak Frites', price: '6oz  29\n10oz  39', tags: ['GF'], desc: 'Certified Angus top sirloin, Béarnaise sauce, frites. Sub frites for seasonal veg $5' },
        { name: 'Beef Wellington', price: '55', desc: 'Cast iron seared beef tenderloin, puff pastry, truffle paste, baby spinach, black pepper cognac cream, pave potatoes, seasonal vegetables' },
        { name: '10oz USDA Prime New York Strip', price: '72', tags: ['GF'], desc: 'Striploin, clarified butter, garlic, fresh thyme, seasonal vegetables, pave potatoes' },
        { name: 'Duo of Duck', price: '65', desc: 'Magret breast and King Cole duck leg, cranberry demi glace, pave potatoes, seasonal vegetables' },
        { name: 'Portside Chili', price: '16', desc: 'Lean ground beef, maple beans, kidney beans, black beans, cheese' },
        { name: 'Lamb Shank', price: '39', tags: ['GF'], desc: 'Braised Australian lamb shank, cranberry demi-glace, pistachio crust, pave potato, seasonal vegetables' },
        { name: 'Butter Chicken', price: '35', desc: 'Curried butter chicken, garlic naan bread, basmati rice' },
      ],
    },
    {
      title: 'Handhelds',
      note: 'All handhelds are served with fries. Upgrade to a side house salad $3, vegan caesar $3, truffle fries $4, poutine $5, chili fries $8',
      items: [
        { name: 'Portside Burger', price: '19', desc: '8oz chuck and brisket patty, potato bun, American cheese, applewood-smoked bacon, red onion, iceberg lettuce, heirloom tomato, quick pickles, burger sauce' },
        { name: 'French Dip', price: '29', desc: '8oz shaved Certified Angus Beef, au jus, caramelized onions, Emmental cheese, toasted baguette' },
        { name: 'Chicken Tenders', price: '19', desc: 'Breaded chicken tenders, beef tallow fries, plum sauce' },
      ],
    },
  ],
];

export const accompaniments: Item[] = [
  { name: 'Chili Cheese Fries', price: '16' },
  { name: 'Chicken Breast', price: '17' },
  { name: 'Garlic Shrimp', price: '25' },
  { name: 'Alaskan King Crab', price: 'MP' },
  { name: 'Hand-cut New York Fries', price: '10' },
  { name: 'Truffle Fries', price: '12' },
  { name: 'Poutine', price: '14' },
  { name: 'Lobster Tail', price: 'MP' },
  { name: 'Pan-Seared Scallop', price: '16' },
];

// Cocktails come from the current website's cocktail card (the winter PDF has no cocktail list).
export const cocktails: Item[] = [
  { name: 'Golden Hour', price: '23', desc: 'Gin, aperol, fresh lime juice, simple syrup, cucumber ribbon, soda' },
  { name: 'Tiramisu Espresso Martini', price: '24', desc: 'Espresso, tiramisu syrup, aged rum, chocolate milk, cocoa powder, lady finger' },
  { name: 'Muskoka Royale', price: '23', desc: 'Empress gin, elderflower liqueur, orange bitters, prosecco, soda, grapefruit twist' },
  { name: 'Floradora', price: '22', desc: 'Vodka, raspberry syrup, fresh lime juice, ginger beer, soda' },
  { name: 'Spicy Margarita', price: '21', desc: 'Blanco tequila, jalapeño, triple sec, fresh lime juice' },
];

export const desserts: Item[] = [
  { name: 'Key Lime Pie', price: '15' },
  { name: 'Molten Lava Cake', price: '15' },
  { name: 'Sticky Toffee Pudding', price: '15' },
  { name: 'White Chocolate Crème Brûlée', price: '15' },
];

export const kitchenRound: Item = { name: 'Buy the kitchen a round (4)', price: '25' };
