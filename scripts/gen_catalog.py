#!/usr/bin/env python3
"""Generate homepage catalog cards and product pages from brochure data."""
from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_DIR = ROOT / "products"
PRODUCTS_DIR.mkdir(exist_ok=True)

PRODUCT_OPTIONS = [
    "Classroom Pro 65\"",
    "Boardroom Elite 75\"",
    "Education Plus 86\"",
    "Mega Display 98\"",
    "Angle Pro",
    "VistaKiosk",
    "AdPole",
    "EdgePlay",
    "AdzoView",
    "BrandLite",
    "RackPro",
    "Luma Desktop",
    "Nexa Counter",
    "ShelfScape",
    "EdgeVue",
    "Fleet IQ CMS",
    "Bulk / Enterprise Procurement",
]


def screen():
    return (
        '<div class="ff-screen"><div class="ff-ui"><div class="ff-ui-bar"></div>'
        '<div class="ff-ui-row"><div class="ff-ui-col"></div><div class="ff-ui-col"></div></div>'
        '</div><div class="ff-scan"></div></div>'
    )


def form_factor(kind):
    s = screen()
    if kind == "easel":
        return f'<div class="ff ff-easel"><div class="ff-shell">{s}</div><div class="ff-leg"></div><div class="ff-base"></div></div>'
    if kind == "totem":
        return f'<div class="ff ff-totem"><div class="ff-shell">{s}</div><div class="ff-plinth"></div></div>'
    if kind == "totem-slim":
        return f'<div class="ff ff-totem slim"><div class="ff-shell">{s}</div><div class="ff-plinth"></div></div>'
    if kind == "wall":
        return f'<div class="ff ff-wall"><div class="ff-shell">{s}</div></div>'
    if kind == "wall-portrait":
        return f'<div class="ff ff-wall portrait"><div class="ff-shell">{s}</div></div>'
    if kind == "standee":
        return f'<div class="ff ff-standee"><div class="ff-shell">{s}</div><div class="ff-base"></div></div>'
    if kind == "rack":
        return (
            f'<div class="ff ff-rack"><div class="ff-shell">{s}</div>'
            '<div class="ff-frame"><div class="ff-shelf"></div><div class="ff-shelf"></div>'
            '<div class="ff-shelf"></div><div class="ff-shelf"></div></div></div>'
        )
    if kind == "counter":
        return f'<div class="ff ff-counter"><div class="ff-shell">{s}</div><div class="ff-desk"></div></div>'
    if kind == "shelf":
        return f'<div class="ff ff-shelf"><div class="ff-shell">{s}</div></div>'
    if kind == "soft":
        return f'<div class="ff ff-soft"><div class="ff-shell">{s}</div></div>'
    return f'<div class="ff ff-wall"><div class="ff-shell">{s}</div></div>'


def chips(items):
    return "".join(f'<span class="chip">{escape(c)}</span>' for c in items)


def size_chips(items):
    return "".join(f'<span class="size-chip">{escape(c)}</span>' for c in items)


def venue_chips(items):
    return "".join(f'<span class="chip">{escape(c)}</span>' for c in items)


def spec_rows(rows):
    out = ['<div class="specs-table reveal">']
    for k, v in rows:
        out.append(
            f'<div class="spec-row"><div class="spec-k">{escape(k)}</div>'
            f'<div class="spec-v"><i class="fas fa-check-circle"></i>{escape(v)}</div></div>'
        )
    out.append("</div>")
    return "\n".join(out)


def compare_table(headers, rows):
    th = "".join(f"<th>{escape(h)}</th>" for h in headers)
    body = []
    for row in rows:
        body.append("<tr>" + "".join(f"<td>{escape(c)}</td>" for c in row) + "</tr>")
    return (
        '<div class="compare-wrap reveal"><table class="compare-table">'
        f"<thead><tr>{th}</tr></thead><tbody>{''.join(body)}</tbody></table></div>"
    )


def feat_grid(features):
    items = []
    for i, (icon, title, copy) in enumerate(features, 1):
        delay = f" d{(i - 1) % 4 + 1}"
        items.append(
            f'<div class="feat-item reveal{delay}">'
            f'<div class="feat-n">{i:02d}</div>'
            f'<div class="feat-i"><i class="fas {icon}"></i></div>'
            f'<div class="feat-h">{escape(title)}</div>'
            f'<p class="feat-p">{escape(copy)}</p></div>'
        )
    return f'<div class="feat-grid">{"".join(items)}</div>'


CATALOG = [
    {
        "slug": "angle-pro",
        "name": "Angle Pro",
        "sku": "SV-AP · Digital Easel",
        "cat": "floor",
        "kind": "easel",
        "tag": "32–43\"",
        "vis_bg": "linear-gradient(135deg,#f0f4ff,var(--bg2))",
        "summary": "Premium angled display easel for boutique showcases — set at the perfect angle for attention.",
        "chips": ["32–43\"", "400 Nits", "Android"],
        "accent": "",
    },
    {
        "slug": "vistakiosk",
        "name": "VistaKiosk",
        "sku": "SV-VK · Digital Totem",
        "cat": "floor",
        "kind": "totem",
        "tag": "32–65\"",
        "vis_bg": "linear-gradient(135deg,#f4f5ff,var(--bg2))",
        "summary": "High-traffic digital totems and interactive pedestals built to command attention in any space.",
        "chips": ["32–65\"", "400 Nits", "Android"],
        "accent": "color:var(--blue)",
    },
    {
        "slug": "adpole",
        "name": "AdPole",
        "sku": "SV-ADP · Digital Totem",
        "cat": "floor",
        "kind": "totem-slim",
        "tag": "24–43\"",
        "vis_bg": "linear-gradient(135deg,#fff8f4,var(--bg2))",
        "summary": "Smart, stylish freestanding totems designed to captivate — and built to perform.",
        "chips": ["24–43\"", "350 Nits", "Android"],
        "accent": "color:var(--warm)",
    },
    {
        "slug": "edgeplay",
        "name": "EdgePlay",
        "sku": "SV-EP · Wall-Mount",
        "cat": "wall",
        "kind": "wall-portrait",
        "tag": "24–43\"",
        "vis_bg": "linear-gradient(135deg,#f0faf4,var(--bg2))",
        "summary": "Flush-mount cinematic displays that elevate every wall with a seamless, space-saving install.",
        "chips": ["24–43\"", "350 Nits", "IPS"],
        "accent": "color:#2d6a4f",
    },
    {
        "slug": "adzoview",
        "name": "AdzoView",
        "sku": "SV-AZ · Cinematic Panel",
        "cat": "wall",
        "kind": "wall",
        "tag": "24–65\"",
        "vis_bg": "linear-gradient(135deg,#f0f4ff,var(--bg2))",
        "summary": "Ultra-slim flush-mount panels for stunning visual experiences in high-impact spaces.",
        "chips": ["24–65\"", "UHD options", "Android"],
        "accent": "color:var(--blue)",
    },
    {
        "slug": "brandlite",
        "name": "BrandLite",
        "sku": "SV-BL · Digital Standee",
        "cat": "floor",
        "kind": "standee",
        "tag": "32\"",
        "vis_bg": "linear-gradient(135deg,#f4f5ff,var(--bg2))",
        "summary": "Premium digital standees that bring products and promotions to life with smart delivery.",
        "chips": ["32\"", "350 Nits", "Optional racks"],
        "accent": "",
    },
    {
        "slug": "rackpro",
        "name": "RackPro",
        "sku": "SV-RP · Display Rack",
        "cat": "retail",
        "kind": "rack",
        "tag": "24\"",
        "vis_bg": "linear-gradient(135deg,#f2f1ee,var(--bg2))",
        "summary": "Multi-tier display racks with a top-mounted digital screen for smarter merchandising.",
        "chips": ["24\"", "4 shelves", "Android"],
        "accent": "",
    },
    {
        "slug": "luma",
        "name": "Luma Desktop",
        "sku": "SV-LM · Interactive Desktop",
        "cat": "retail",
        "kind": "counter",
        "tag": "10.1\"",
        "vis_bg": "linear-gradient(135deg,#eef3ff,var(--bg2))",
        "summary": "Sleek desktop interactive units crafted for powerful in-store engagement.",
        "chips": ["10.1\"", "10-pt touch", "Cloud / PNP"],
        "accent": "color:var(--blue)",
    },
    {
        "slug": "nexa",
        "name": "Nexa Counter",
        "sku": "SV-NX · Counter Display",
        "cat": "retail",
        "kind": "counter",
        "tag": "3–21\"",
        "vis_bg": "linear-gradient(135deg,#fff8f4,var(--bg2))",
        "summary": "Ultra-slim counter displays designed to captivate, connect, and convert at every point of sale.",
        "chips": ["3–21\"", "400 Nits", "Android"],
        "accent": "color:var(--warm)",
    },
    {
        "slug": "shelfscape",
        "name": "ShelfScape",
        "sku": "SV-SS · Shelf Header",
        "cat": "retail",
        "kind": "shelf",
        "tag": "24–48\"",
        "vis_bg": "linear-gradient(135deg,#f0faf4,var(--bg2))",
        "summary": "Ultra-wide digital shelf headers that make every aisle unmissable.",
        "chips": ["24–48\"", "500–700 nits", "Android"],
        "accent": "color:#2d6a4f",
    },
    {
        "slug": "edgevue",
        "name": "EdgeVue",
        "sku": "SV-EV · Shelf Edge",
        "cat": "retail",
        "kind": "shelf",
        "tag": "23.1–47.1\"",
        "vis_bg": "linear-gradient(135deg,#f4f5ff,var(--bg2))",
        "summary": "Eye-catching shelf-edge and stretch-bar screens for real-time promotions.",
        "chips": ["23.1–47.1\"", "400–500 nits", "Plug & Play"],
        "accent": "color:var(--blue)",
    },
    {
        "slug": "fleet-iq",
        "name": "Fleet IQ",
        "sku": "SV-IQ · Cloud CMS",
        "cat": "software",
        "kind": "soft",
        "tag": "Cloud",
        "vis_bg": "linear-gradient(135deg,#eef3ff,var(--bg2))",
        "summary": "Centralized cloud fleet control — schedule, monitor, and grow every SpectraVue screen.",
        "chips": ["Cloud", "Real-time", "Multi-site"],
        "accent": "color:var(--blue)",
    },
]

PAGES = {
    "angle-pro": {
        "label": "Floor Display",
        "headline": "Angle Pro",
        "italic": "Perfect angle.",
        "lead": "Premium angled display easel for boutique showcases. Sleek, stylish, and set at the perfect angle for attention.",
        "pills": ["178° Wide View", "20W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "Android OS", "Lockable"],
        "features": [
            ("fa-gem", "Premium Design", "Elegant angled easel design for maximum visibility in boutique and retail settings."),
            ("fa-tv", "Full HD Display", "1080×1920 resolution with vibrant 16.7M color reproduction."),
            ("fa-microchip", "Smart Performance", "Smooth Android OS performance with 1GB RAM and 8GB storage."),
            ("fa-lock", "Secure & Durable", "Lockable body with a sturdy build designed for long-term use."),
            ("fa-plug", "Easy Connectivity", "HDMI, USB playback, Bluetooth 5.0, and Wi-Fi for hassle-free content."),
        ],
        "sizes": ["32\"", "43\""],
        "specs": [
            ("Available Sizes", "32\" and 43\""),
            ("Resolution", "1080 × 1920 pixels"),
            ("Brightness", "400 nits"),
            ("Refresh Rate", "60Hz"),
            ("Hardware", "1GB RAM / 8GB ROM"),
            ("Viewing Angle", "178° wide view"),
            ("Audio", "20W speaker"),
            ("Connectivity", "HDMI, USB playback, Bluetooth 5.0, Wi-Fi"),
            ("Operating System", "Android OS with multi-app support"),
            ("Body Colors", "Black or White"),
            ("Power", "50W max (32\") · 65W max (43\")"),
        ],
        "compare": (
            ["Size", "Height", "Width", "Thickness", "Weight", "Screen (H × W)", "Power"],
            [
                ["32\"", "1325 mm", "430 mm", "450 mm", "13.5 kg", "690 × 379 mm", "50W max"],
                ["43\"", "1610 mm", "560 mm", "610 mm", "21.2 kg", "928 × 510 mm", "65W max"],
            ],
        ),
        "venues": ["Retail Stores", "Salons & Spas", "Boutiques", "Exhibitions", "Malls & Showrooms"],
        "related": ["brandlite", "adpole", "vistakiosk"],
    },
    "vistakiosk": {
        "label": "Floor Display",
        "headline": "VistaKiosk",
        "italic": "Stand tall.",
        "lead": "Elegant, powerful digital totems and interactive pedestals. Built to command attention in high-traffic spaces.",
        "pills": ["178° Wide View", "20W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "IPS Panel", "Android OS"],
        "features": [
            ("fa-eye", "High Visibility", "Tall, bright displays designed to grab attention in malls, airports, and lobbies."),
            ("fa-microchip", "Powerful Performance", "Smooth Android operation with storage that scales by size."),
            ("fa-wifi", "Versatile Connectivity", "Wi-Fi, Bluetooth, HDMI, and USB for seamless content delivery."),
            ("fa-shield-alt", "Durable Build", "Built for 24/7 use in high-traffic public environments."),
            ("fa-th-large", "Easy Content Management", "Multi-app support for dynamic, always-fresh engagement."),
        ],
        "sizes": ["32\"", "43\"", "55\"", "65\""],
        "specs": [
            ("Available Sizes", "32\", 43\", 55\", and 65\""),
            ("Resolution", "1080 × 1920 (32\"/43\") · 2160 × 3840 (55\"/65\")"),
            ("Brightness", "400 nits"),
            ("Hardware", "1GB / 8GB (32\"/43\") · 2GB / 16GB (55\"/65\")"),
            ("Panel", "IPS, 178° viewing angle, 16.7M colors, 60Hz"),
            ("Audio", "20W speaker"),
            ("Connectivity", "HDMI, USB, Bluetooth 5.0, Wi-Fi"),
            ("Operating System", "Android OS with multi-app support"),
            ("Body Colors", "Black or White"),
        ],
        "compare": (
            ["Size", "Height", "Width", "Thickness", "Weight", "Screen (H × W)", "Power"],
            [
                ["32\" Vista", "1380 mm", "430 mm", "345 mm", "20.35 kg", "690 × 379 mm", "50W max"],
                ["43\" Vista", "1700 mm", "560 mm", "445 mm", "31.05 kg", "928 × 510 mm", "65W max"],
                ["55\" Vista", "1995 mm", "714 mm", "490 mm", "45 kg", "1203 × 664 mm", "120W max"],
                ["65\" Vista", "1945 mm", "830 mm", "490 mm", "52.75 kg", "1420 × 734 mm", "150W max"],
            ],
        ),
        "venues": ["Shopping Malls", "Retail Stores", "Airports", "Restaurants", "Exhibitions", "Corporate Lobbies", "Education Centers", "Hospitals"],
        "related": ["adpole", "angle-pro", "adzoview"],
    },
    "adpole": {
        "label": "Floor Display",
        "headline": "AdPole",
        "italic": "Stand out.",
        "lead": "Smart. Stylish. Strategic. Freestanding digital totems designed to captivate — and built to perform wherever you go.",
        "pills": ["178° Wide View", "20W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "IPS Panel", "Android OS"],
        "features": [
            ("fa-eye", "High Visibility", "Tall, bright displays designed to grab attention in any environment."),
            ("fa-monument", "Freestanding Design", "Sturdy pedestal stand ensures stability and easy placement."),
            ("fa-microchip", "Powerful Performance", "Smooth Android operation with ample onboard storage."),
            ("fa-cloud", "Easy Content Management", "Remote updates and multi-app support for dynamic content."),
            ("fa-clock", "Durable & Reliable", "Built for 24/7 use in high-traffic public spaces."),
        ],
        "sizes": ["24\"", "32\"", "43\""],
        "specs": [
            ("Available Sizes", "24\", 32\", and 43\""),
            ("Resolution", "1080 × 1920 pixels"),
            ("Brightness", "350 nits"),
            ("Hardware", "1GB RAM / 8GB ROM"),
            ("Panel", "IPS, 178° viewing angle, 16.7M colors, 60Hz"),
            ("Audio", "20W speaker"),
            ("Connectivity", "HDMI, USB, Bluetooth 5.0, Wi-Fi"),
            ("Operating System", "Android OS with multi-app support"),
            ("Body Colors", "Black or White"),
        ],
        "compare": (
            ["Size", "Height", "Width", "Thickness", "Weight", "Screen (H × W)", "Power"],
            [
                ["24\" AdPole", "1745 mm", "325 mm", "380 mm", "18.85 kg", "537 × 282 mm", "40W max"],
                ["32\" AdPole", "1745 mm", "430 mm", "380 mm", "17.2 kg", "718 × 423 mm", "50W max"],
                ["43\" AdPole", "1950 mm", "560 mm", "380 mm", "27.75 kg", "955 × 555 mm", "65W max"],
            ],
        ),
        "venues": ["Airports", "Shopping Malls", "Retail Stores", "Restaurants", "Hotels", "Exhibitions", "Corporate Offices", "Events & Venues"],
        "related": ["vistakiosk", "angle-pro", "brandlite"],
    },
    "edgeplay": {
        "label": "Wall Display",
        "headline": "EdgePlay",
        "italic": "On the wall.",
        "lead": "Sleek. Seamless. Spectacular. Flush-mount cinematic displays that elevate every wall.",
        "pills": ["178° Wide View", "20W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "IPS Panel", "Android OS"],
        "features": [
            ("fa-film", "Cinematic Visuals", "Vibrant IPS panels for lifelike color and a wide viewing angle."),
            ("fa-expand", "Flush-Mount Design", "Sleek, space-saving installation that blends with any wall."),
            ("fa-sun", "High Brightness", "350 nits ensures visibility even in bright commercial spaces."),
            ("fa-clock", "Reliable & Durable", "Built to run long hours, 24/7, with stable performance."),
            ("fa-th-large", "Smart Content Management", "Easy updates with multi-app support and remote delivery."),
        ],
        "sizes": ["24\"", "32\"", "43\""],
        "specs": [
            ("Available Sizes", "24\", 32\", and 43\""),
            ("Resolution", "1080 × 1920 pixels"),
            ("Brightness", "350 nits"),
            ("Hardware", "1GB RAM / 8GB ROM"),
            ("Panel", "IPS, 178° viewing angle, 16.7M colors, 60Hz"),
            ("Audio", "20W speaker"),
            ("Connectivity", "HDMI, USB, Bluetooth 5.0, Wi-Fi"),
            ("Operating System", "Android OS with multi-app support"),
            ("Body Colors", "Black or White"),
        ],
        "compare": (
            ["Size", "Height", "Width", "Thickness", "Weight", "Screen (H × W)", "Power"],
            [
                ["24\" EdgePlay", "750 mm", "325 mm", "45 mm", "6.65 kg", "537 × 282 mm", "40W max"],
                ["32\" EdgePlay", "931 mm", "428 mm", "47 mm", "10.1 kg", "718 × 423 mm", "50W max"],
                ["43\" EdgePlay", "1240 mm", "560 mm", "45 mm", "17.2 kg", "955 × 555 mm", "65W max"],
            ],
        ),
        "venues": ["Retail Stores", "Shopping Malls", "Restaurants", "Hotels", "Elevators", "Corporate Offices", "Hospitals"],
        "related": ["adzoview", "vistakiosk", "edgevue"],
    },
    "adzoview": {
        "label": "Wall Display",
        "headline": "AdzoView",
        "italic": "Bigger impact.",
        "lead": "Stunning visual experiences with ultra-slim, flush-mount cinematic panels built for impact.",
        "pills": ["178° Wide View", "20W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "IPS Panel", "Android OS"],
        "features": [
            ("fa-film", "Cinematic Visuals", "Full HD to Ultra HD clarity with vibrant colors and a wide viewing angle."),
            ("fa-compress-alt", "Slim & Flush Design", "Sleek, space-saving design that blends perfectly with any wall."),
            ("fa-bolt", "Powerful Performance", "Smooth playback, reliable operation, and stunning output."),
            ("fa-leaf", "Energy Efficient", "Optimized power consumption for longer, cooler performance."),
            ("fa-wifi", "Smart Connectivity", "Wi-Fi, Bluetooth, HDMI, and USB for seamless content delivery."),
        ],
        "sizes": ["24\"", "32\"", "43\"", "55\"", "65\""],
        "specs": [
            ("Available Sizes", "24\", 32\", 43\", 55\", and 65\""),
            ("Resolution", "1080 × 1920 / 1920 × 1080 (24–43\") · 2160 × 3840 / 3840 × 2160 (55–65\")"),
            ("Brightness", "350 nits (24–43\") · 400 nits (55–65\")"),
            ("Hardware", "1GB / 8GB (24–43\") · 2GB / 16GB (55–65\")"),
            ("Motion Rate", "60Hz (smaller sizes) · 100Hz (larger sizes)"),
            ("Panel", "IPS, 178° viewing angle, 16.7M colors"),
            ("Audio", "20W speaker"),
            ("Connectivity", "HDMI, USB, Bluetooth 5.0, Wi-Fi"),
            ("Body Colors", "Black or White"),
        ],
        "compare": (
            ["Size", "Product (H × W × T)", "Weight", "Screen (H × W)", "Power"],
            [
                ["24\"", "319 × 540 × 76 mm", "2.15 kg", "512 × 294 mm", "40W max"],
                ["32\"", "718 × 423 × 80 mm", "3.65 kg", "640 × 376 mm", "50W max"],
                ["43\"", "955 × 555 × 100 mm", "6 kg", "923 × 510 mm", "65W max"],
                ["55\"", "1235 × 730 × 100 mm", "9.1 kg", "1203 × 664 mm", "120W max"],
                ["65\"", "1445 × 830 × 100 mm", "12.95 kg", "1420 × 784 mm", "150W max"],
            ],
        ),
        "venues": ["Airports", "Exhibitions", "Retail Stores", "Shopping Malls", "Restaurants", "Corporate Offices", "Showrooms"],
        "related": ["edgeplay", "vistakiosk", "shelfscape"],
    },
    "brandlite": {
        "label": "Floor Display",
        "headline": "BrandLite",
        "italic": "Stand out.",
        "lead": "Premium digital display standees designed to elevate brand presence. Showcase. Engage. Influence.",
        "pills": ["Wide View", "Built-in Speaker", "USB Plug & Play", "Bluetooth", "Wi-Fi", "IPS Panel", "Optional Racks"],
        "features": [
            ("fa-eye", "Vivid Display", "Stunning visuals that capture attention the moment someone walks by."),
            ("fa-gem", "Sleek & Modern", "Premium design that suits retail floors, lobbies, and events."),
            ("fa-wifi", "Smart Connectivity", "Wi-Fi, Bluetooth, and remote management for live campaigns."),
            ("fa-calendar-alt", "Easy Content Management", "Update and schedule content without touching the standee."),
            ("fa-layer-group", "Optional Racks", "Add up to three racks for brochures, products, and more."),
        ],
        "sizes": ["32\""],
        "specs": [
            ("Available Size", "32\""),
            ("Product Size", "1650 × 430 × 35 mm (H × W × T)"),
            ("Base", "502 mm wide × 280 mm deep"),
            ("Weight", "13.8 kg without rack"),
            ("Screen", "718 × 423 mm"),
            ("Resolution", "1080 × 1920 pixels"),
            ("Brightness", "350 nits"),
            ("Hardware", "1GB RAM / 4GB ROM"),
            ("Power", "50W max"),
            ("Optional Racks", "3 racks · 380 × 280 mm each"),
            ("Body Colors", "Black or White"),
        ],
        "compare": None,
        "venues": ["Retail Floors", "Lobbies", "Exhibitions", "Brand Activations", "Showrooms"],
        "related": ["angle-pro", "rackpro", "adpole"],
    },
    "rackpro": {
        "label": "Retail & POS",
        "headline": "RackPro",
        "italic": "Display more.",
        "lead": "Smart multi-tier display racks integrated with a premium digital screen. Organize better. Sell smarter.",
        "pills": ["20W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "IPS Panel", "4 Shelves", "Android OS"],
        "features": [
            ("fa-eye", "Maximum Visibility", "A top-mounted digital screen grabs attention and boosts brand recall."),
            ("fa-layer-group", "Smart Organization", "Four spacious shelves for brochures, products, and promotions."),
            ("fa-hammer", "Premium Build", "Sleek black metal frame with ventilated, perforated shelves."),
            ("fa-dolly", "Easy to Move", "Lightweight design makes it easy to relocate and reuse."),
            ("fa-tools", "Easy Assembly", "Quick setup with a user-friendly, exhibition-ready frame."),
        ],
        "sizes": ["24\""],
        "specs": [
            ("Available Size", "24\" top screen"),
            ("Product Size", "1660 × 450 × 340 mm (H × W × T)"),
            ("Weight", "13.95 kg"),
            ("Screen", "282 × 537 mm"),
            ("Resolution", "1920 × 1080 pixels"),
            ("Brightness", "350 nits"),
            ("Hardware", "1GB RAM / 8GB ROM"),
            ("Power", "40W max"),
            ("Shelves", "4 racks · 547 × 287 mm"),
            ("Body Color", "Black"),
            ("Viewing Angle", "178°"),
        ],
        "compare": None,
        "venues": ["Waiting Areas", "Product Launches", "Pharmacies", "Malls & Showrooms", "Exhibitions", "Retail Stores", "Corporate Offices"],
        "related": ["brandlite", "nexa", "luma"],
    },
    "luma": {
        "label": "Retail & POS",
        "headline": "Luma Desktop",
        "italic": "Engage more.",
        "lead": "Sleek desktop interactive units crafted for powerful in-store interactions. Display. Engage. Elevate sales.",
        "pills": ["10-Point Touch", "Cloud / PNP", "Built-in Speaker", "Wi-Fi + Bluetooth", "IPS Panel", "10.1\""],
        "features": [
            ("fa-hand-pointer", "Smart Interaction", "10-point PCAP touch (non-airgap) for seamless customer engagement."),
            ("fa-cloud", "Cloud & PNP Ready", "Effortless content management with Cloud or Plug & Play."),
            ("fa-briefcase", "Built to Business", "Sleek, reliable, and designed for every point of sale."),
            ("fa-chart-line", "Boost Sales", "Deliver the right message at the right moment on the counter."),
            ("fa-sync", "Easy Management", "Update content remotely via Cloud or local USB playback."),
        ],
        "sizes": ["10.1\" Cloud PNP", "10.1\" Cloud Touch PNP"],
        "specs": [
            ("Available Size", "10.1\""),
            ("Configurations", "Cloud PNP and Cloud Touch PNP"),
            ("Touch", "10-point PCAP (non-airgap) on the touch model"),
            ("Product Size", "130 × 158 × 255 mm"),
            ("Weight", "600 g vertical · 750 g horizontal"),
            ("Resolution", "800 × 1200 (vertical) · 1200 × 800 (horizontal)"),
            ("Hardware", "1GB RAM / 8GB ROM"),
            ("CPU", "Allwinner A133 Quad-core Cortex-A53, 1.6GHz"),
            ("Power", "12V 2A adapter"),
            ("Ports", "RJ45, USB, Type-C"),
            ("Optional", "Microphone and camera"),
            ("CMS", "Cloud PNP"),
        ],
        "compare": None,
        "venues": ["Point of Sale", "Reception Desks", "Showrooms", "Clinics", "Hospitality Counters"],
        "related": ["nexa", "rackpro", "fleet-iq"],
    },
    "nexa": {
        "label": "Retail & POS",
        "headline": "Nexa Counter",
        "italic": "See it. Sell it.",
        "lead": "Ultra-slim interactive counter units designed to boost engagement at every point of sale.",
        "pills": ["Wide View", "Built-in Speaker", "USB Plug & Play", "LAN + Wi-Fi", "Android OS", "Touch Optional"],
        "features": [
            ("fa-compress", "Slim & Modular", "Designed to fit any counter setup from 3\" to 21\"."),
            ("fa-clock", "High Reliability", "24/7 performance you can count on in retail environments."),
            ("fa-plug", "Easy Integration", "Plug, play, and manage with Cloud, PNP, or optional 10-point touch."),
            ("fa-bullseye", "Engage Better", "Interactive content that drives action at the moment of purchase."),
            ("fa-chart-line", "Increase Sales", "Smart displays, higher impact, more conversions."),
        ],
        "sizes": ["3\"", "5\"", "7\"", "10.1\"", "13.3\"", "15.6\"", "18.6\"", "21\""],
        "specs": [
            ("Available Sizes", "3\", 5\", 7\", 10.1\", 13.3\", 15.6\", 18.6\", 21\""),
            ("Brightness", "400 nits"),
            ("Hardware", "1GB RAM / 8GB ROM"),
            ("Motion Rate", "60Hz"),
            ("Operating System", "Android OS"),
            ("Connectivity", "USB plug & play, LAN, Bluetooth, Wi-Fi"),
            ("Options", "Cloud / PNP / 10-point capacitive touch"),
            ("Lock Function", "Yes"),
        ],
        "compare": (
            ["Size", "H × W × T (mm)", "Weight", "Screen (H × W)", "Resolution (V / H)", "Power"],
            [
                ["3\"", "58 × 70 × 5", "100 g", "47 × 66 mm", "480 × 720 / 720 × 480", "5V 2A"],
                ["5\"", "66 × 119 × 8", "100 g", "66 × 112 mm", "720 × 1280 / 1280 × 720", "5V 2A"],
                ["7\"", "103 × 166 × 8", "200 g", "89 × 157 mm", "600 × 1024 / 1024 × 600", "5V 2A"],
                ["10.1\"", "144 × 230 × 5", "300 g", "133 × 218 mm", "800 × 1280 / 1280 × 800", "5V 2A"],
                ["13.3\"", "189 × 303 × 5", "300 g", "167 × 295 mm", "1080 × 1920 / 1920 × 1080", "14V 2A"],
                ["15.6\"", "218 × 352 × 8", "500 g", "196 × 345 mm", "1080 × 1920 / 1920 × 1080", "14V 2A"],
                ["18.6\"", "230 × 410 × 10", "1.5 kg", "226 × 405 mm", "1080 × 1920 / 1920 × 1080", "14V 2A"],
                ["21\"", "300 × 497 × 10", "1.5 kg", "297 × 495 mm", "1920 × 1920 / 1920 × 1920", "14V 2A"],
            ],
        ),
        "venues": ["Retail Counters", "Pharmacies", "Hospitality", "Clinics", "Showrooms", "QSR"],
        "related": ["luma", "edgevue", "rackpro"],
    },
    "shelfscape": {
        "label": "Retail & POS",
        "headline": "ShelfScape",
        "italic": "Unmissable shelves.",
        "lead": "Ultra-wide digital header screens that elevate retail space, capture attention, and drive action.",
        "pills": ["Ultra-Wide", "2W Speaker", "HDMI + USB", "Bluetooth 5.0", "Wi-Fi", "Android OS"],
        "features": [
            ("fa-expand", "Maximum Visibility", "Ultra-wide screens designed to grab attention instantly."),
            ("fa-store", "Smart Retail Solution", "Perfect for promotions, branding, and dynamic product updates."),
            ("fa-compress-alt", "Seamless Integration", "Flush-mount design blends with any shelf layout."),
            ("fa-leaf", "Energy Efficient", "Low power consumption for cost-effective 24/7 operations."),
            ("fa-shield-alt", "Reliable Performance", "Premium components built for long-lasting retail duty."),
        ],
        "sizes": ["24\"", "37\"", "48\""],
        "specs": [
            ("Available Sizes", "24\", 37\", and 48\""),
            ("Resolution", "1920 × 360 (24\") · 1920 × 540 (37\" and 48\")"),
            ("Brightness", "700 cd/m² (24\") · 500 cd/m² (37\")"),
            ("Hardware", "2GB / 16GB (24\") · 1GB / 8GB (37\")"),
            ("Audio", "2W speaker"),
            ("Connectivity", "HDMI, USB, Bluetooth 5.0, Wi-Fi"),
            ("Operating System", "Android OS with multi-app support"),
            ("Body Color", "Black"),
        ],
        "compare": (
            ["Size", "Height", "Width", "Thickness", "Weight", "Screen (H × W)", "Power"],
            [
                ["24\"", "137 mm", "617.5 mm", "45.7 mm", "8.5 kg", "125 × 600 mm", "18W max"],
                ["37\"", "280.9 mm", "914.9 mm", "45.7 mm", "7.1 kg", "254 × 900 mm", "60W max"],
                ["48\"", "239.52 mm", "1199.44 mm", "52.9 mm", "7.5 kg", "224 × 1190 mm", "80W max"],
            ],
        ),
        "venues": ["Retail Stores", "Supermarkets", "Pharmacies", "Showrooms", "Electronics Stores", "Cosmetics Stores", "Brand Displays", "Impulse Zones"],
        "related": ["edgevue", "adzoview", "nexa"],
    },
    "edgevue": {
        "label": "Retail & POS",
        "headline": "EdgeVue",
        "italic": "Smart shelf.",
        "lead": "Eye-catching shelf-edge screens and stretch display bars for real-time promotions — with VueCore for seamless control.",
        "pills": ["Ultra-Wide", "Loop Playback", "Low Power", "Wireless Control", "IPS Panel", "USB Plug & Play"],
        "features": [
            ("fa-expand", "Wide Aspect Ratio", "Stretched VuePanel bars made to stand out on any shelf edge."),
            ("fa-sync", "Loop Playback", "Always-on promotional loops without a dedicated operator."),
            ("fa-leaf", "Low Power", "Efficient 18–30W operation for dense retail deployments."),
            ("fa-wifi", "Wireless Control", "Remote management through VueCore, the smart control unit."),
            ("fa-clock", "24/7 Performance", "Built for continuous shelf-edge duty in live retail."),
        ],
        "sizes": ["23.1\"", "35\"", "47.1\""],
        "specs": [
            ("Family", "EdgeVue shelf-edge · VuePanel stretch bar · VueCore control unit"),
            ("Available Sizes", "23.1\", 35\", and 47.1\""),
            ("Resolution", "1920 × 158 (23.1\") · 3840 × 200 (35\") · 3840 × 160 (47.1\")"),
            ("Brightness", "400 cd/m² (23.1\") · 500 cd/m² (35\"/47.1\")"),
            ("Hardware", "1GB / 8GB (23.1\") · 2GB / 16GB (35\"/47.1\")"),
            ("Panel", "IPS with wide viewing angle"),
            ("Connectivity", "USB plug & play, wireless control, remote management"),
        ],
        "compare": (
            ["Size", "H × W × T (mm)", "Weight", "Screen (H × W)", "Resolution", "Power"],
            [
                ["23.1\"", "61.8 × 597.2 × 15", "1.5 kg", "48 × 585 mm", "1920 × 158", "18W max"],
                ["35\"", "60.4 × 891.6 × 23", "2.5 kg", "45 × 877 mm", "3840 × 200", "≤ 30W"],
                ["47.1\"", "67.7 × 1214.2 × 29.2", "3.1 kg", "50 × 1196 mm", "3840 × 160", "30W max"],
            ],
        ),
        "venues": ["Supermarkets", "Pharmacies", "Electronics Aisles", "Cosmetics", "Impulse Zones"],
        "related": ["shelfscape", "nexa", "adzoview"],
    },
    "fleet-iq": {
        "label": "Software",
        "headline": "Fleet IQ",
        "italic": "Simplify. Control.",
        "lead": "Complexity made simple. Centralized cloud fleet management for every SpectraVue screen — from one location to thousands.",
        "pills": ["Cloud Control", "Remote Scheduling", "Device Health", "Role-Based Access", "Audit Trail"],
        "features": [
            ("fa-cloud", "Centralized Cloud Control", "An internet-based network dashboard for every screen in the fleet."),
            ("fa-calendar-check", "Remote Scheduling", "Publish and schedule content from any terminal, anywhere."),
            ("fa-sync", "Real-Time Sync", "Deploy updates across all locations in one motion."),
            ("fa-heartbeat", "Live Visibility", "Layout screenshots and device-health status at a glance."),
            ("fa-users-cog", "Team Access", "Multi-user access with role-based permissions and a full audit trail."),
        ],
        "sizes": [],
        "specs": [
            ("Platform", "Cloud fleet management solution"),
            ("Control", "Centralized internet-based network monitoring dashboard"),
            ("Scheduling", "Remote content scheduling from any terminal globally"),
            ("Deployment", "Real-time sync across all locations"),
            ("Monitoring", "Live layout screenshots and device health visibility"),
            ("Access", "Multi-user team access with role-based permissions"),
            ("Compliance", "Full audit trail and playback log history"),
            ("Scale", "From a single screen to thousands, including multi-city networks"),
            ("Security", "Enterprise-grade security for peace of mind"),
            ("Support", "Dedicated expert assistance whenever you need it"),
        ],
        "compare": None,
        "venues": ["Multi-city Brand Networks", "Retail Chains", "Enterprises", "Education Groups", "Hospitality"],
        "related": ["vistakiosk", "adzoview", "nexa"],
    },
}

BY_SLUG = {p["slug"]: p for p in CATALOG}


def product_options_html(selected=""):
    opts = ['<option value="">Select a product</option>']
    for name in PRODUCT_OPTIONS:
        sel = " selected" if name == selected else ""
        opts.append(f'<option{sel}>{escape(name)}</option>')
    return "\n                ".join(opts)


def chrome(prefix):
    home = f"{prefix}index.html"
    logo = f"{prefix}spectravue-logo.png"
    return {
        "home": home,
        "logo": logo,
        "css": f"{prefix}css/styles.css",
        "js": f"{prefix}js/site.js",
        "nav": f"""
        <ul class="nav-links">
          <li><a href="{home}#features">Features</a></li>
          <li><a href="{home}#products">Products</a></li>
          <li><a href="{home}#use-cases">Use Cases</a></li>
          <li><a href="{home}#specs">Specs</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>""",
        "mob": f"""
    <a href="{home}#features" onclick="closeMob()">Features</a>
    <a href="{home}#products" onclick="closeMob()">Products</a>
    <a href="{home}#use-cases" onclick="closeMob()">Use Cases</a>
    <a href="{home}#specs" onclick="closeMob()">Specs</a>
    <a href="#contact" onclick="closeMob()">Contact</a>""",
    }


def footer(prefix, product_links):
    home = f"{prefix}index.html"
    logo = f"{prefix}spectravue-logo.png"
    items = "\n            ".join(
        f'<li><a href="{href}">{escape(label)}</a></li>' for href, label in product_links
    )
    return f"""  <footer>
    <div class="container">
      <div class="footer-top">
        <div>
          <a href="{home}" class="logo">
            <img src="{logo}" alt="SpectraVue Logo" class="logo-img">
          </a>
          <p class="footer-desc">Leading manufacturer of interactive panels and digital display solutions for enterprise, education, retail, and public spaces.</p>
          <div class="socials">
            <a href="#" class="soc"><i class="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/company/spectravue-tech/" class="soc"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="soc"><i class="fab fa-youtube"></i></a>
            <a href="#" class="soc"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="fc">
          <h4>Products</h4>
          <ul>
            {items}
            <li><a href="{home}#contact">Custom Orders</a></li>
          </ul>
        </div>
        <div class="fc">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Installation Guide</a></li>
            <li><a href="#">Firmware Updates</a></li>
            <li><a href="#">Warranty Info</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="fc">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bot">
        <p>© 2026 SpectraVue Inc. All rights reserved.</p>
        <div class="fbot-links"><a href="#">Privacy Policy</a><a href="#">Terms of Use</a><a href="#">Cookie Settings</a></div>
      </div>
    </div>
  </footer>"""


def contact_block(selected=""):
    return f"""  <section id="contact" class="contact">
    <div class="container">
      <div style="text-align:center;margin-bottom:68px" class="reveal">
        <div class="s-label" style="justify-content:center">Get In Touch</div>
        <h2 class="s-title">Let's connect.</h2>
        <p class="s-sub" style="margin:0 auto">Our specialists respond within 4 business hours. Tell us your space — we'll find the perfect solution.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info reveal-l">
          <h3>Talk to a Specialist</h3>
          <p>Whether you're outfitting a single display or scaling a fleet, our team is ready to guide you.</p>
          <div class="c-item">
            <div class="c-ic"><i class="fas fa-phone"></i></div>
            <div>
              <div class="c-lbl">Phone</div>
              <div class="c-val">9321618509</div>
            </div>
          </div>
          <div class="c-item">
            <div class="c-ic"><i class="fas fa-envelope"></i></div>
            <div>
              <div class="c-lbl">Email</div>
              <div class="c-val">spectravue.ind@gmail.com</div>
            </div>
          </div>
          <div class="c-item">
            <div class="c-ic"><i class="fas fa-map-marker-alt"></i></div>
            <div>
              <div class="c-lbl">Head Office</div>
              <div class="c-val">Anupam Villa, Kale Marg, Bail Bajar, Kurla, Mumbai, Maharashtra 400070</div>
            </div>
          </div>
          <div class="c-item" id="waContact" style="cursor:pointer;">
            <div class="c-ic"><i class="fab fa-whatsapp"></i></div>
            <div>
              <div class="c-lbl">WhatsApp</div>
              <div class="c-val">+91 9321618509</div>
            </div>
          </div>
        </div>
        <div class="contact-form-card reveal-r">
          <div class="form-hd">Request a Demo or Quote</div>
          <form id="contactForm">
            <div class="form-row">
              <div class="fg">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Alex Morgan" required>
              </div>
              <div class="fg">
                <label>Work Email</label>
                <input type="email" name="email" placeholder="alex@company.com" required>
              </div>
            </div>
            <div class="form-row">
              <div class="fg">
                <label>Phone</label>
                <input type="tel" name="phone" placeholder="93xxxxxx">
              </div>
              <div class="fg">
                <label>Organisation</label>
                <input type="text" name="company" placeholder="Acme Corp">
              </div>
            </div>
            <div class="fg">
              <label>Product Interest</label>
              <select name="product">
                {product_options_html(selected)}
              </select>
            </div>
            <div class="fg">
              <label>Message</label>
              <textarea name="message" placeholder="Tell us about your space, number of units, and timeline..."></textarea>
            </div>
            <input type="hidden" name="source" value="Website Contact Form">
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:13px;font-size:.85rem">
              <i class="fas fa-paper-plane"></i>Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>"""


def header_block(ch):
    return f"""  <div id="cur"></div>
  <div id="cur-ring"></div>
  <header id="header" class="scrolled">
    <div class="container">
      <nav class="nav">
        <a href="{ch['home']}" class="logo">
          <img src="{ch['logo']}" alt="SpectraVue Logo" class="logo-img">
        </a>
        {ch['nav']}
        <div class="nav-cta">
          <a href="#contact" class="btn btn-outline" style="padding:9px 20px;font-size:.74rem">Get a Quote</a>
          <a class="btn btn-primary wa-btn" style="padding:9px 20px;font-size:.74rem">Book Demo</a>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu"><i class="fas fa-bars"></i></button>
      </nav>
    </div>
  </header>
  <div class="mob-menu" id="mobMenu">
    {ch['mob']}
    <div class="mob-btns">
      <a href="#contact" class="btn btn-outline" onclick="closeMob()">Get a Quote</a>
      <a href="#contact" class="btn btn-primary" onclick="closeMob()">Book Demo</a>
    </div>
  </div>"""


GALLERY_COUNTS = {
    "angle-pro": 3,
    "vistakiosk": 4,
    "adpole": 3,
    "edgeplay": 3,
    "adzoview": 2,
    "brandlite": 4,
    "rackpro": 2,
    "luma": 2,
    "nexa": 1,
    "shelfscape": 2,
    "edgevue": 2,
    "fleet-iq": 1,
}


def product_img(p, prefix):
    return (
        f'<img class="prod-photo" src="{prefix}images/products/{p["slug"]}.jpg" '
        f'alt="{escape(p["name"])}">'
    )


def product_gallery(p):
    slug = p["slug"]
    count = GALLERY_COUNTS.get(slug, 1)
    main = f'<img class="pd-hero-photo" src="../images/products/{slug}.jpg" alt="{escape(p["name"])}">'
    if count <= 1:
        return f'<div class="pd-hero-vis">{main}</div>'
    thumbs = []
    for i in range(1, count + 1):
        src = f"../images/products/{slug}/{i:02d}.jpg" if i > 1 else f"../images/products/{slug}.jpg"
        if i > 1:
            src = f"../images/products/{slug}/{i:02d}.jpg"
        else:
            src = f"../images/products/{slug}/01.jpg"
        active = " active" if i == 1 else ""
        thumbs.append(
            f'<button type="button" class="pd-thumb{active}" data-src="{src}">'
            f'<img src="{src}" alt="{escape(p["name"])} view {i}"></button>'
        )
    return (
        '<div class="pd-gallery">'
        f'<div class="pd-hero-vis"><img class="pd-hero-photo" src="../images/products/{slug}/01.jpg" alt="{escape(p["name"])}"></div>'
        f'<div class="pd-thumbs">{"".join(thumbs)}</div>'
        "</div>"
    )


def catalog_card(p, href_prefix="products/", price_href="#contact", img_prefix=""):
    style = f' style="{p["accent"]}"' if p["accent"] else ""
    return f"""        <div class="prod-card reveal" data-cat="{p['cat']}" data-href="{href_prefix}{p['slug']}.html">
          <div class="prod-vis has-photo">
            {product_img(p, img_prefix)}
            <div class="cptag" style="position:absolute;bottom:10px">{escape(p['tag'])}</div>
          </div>
          <div class="prod-body">
            <div class="prod-mtag"{style}>{escape(p['sku'])}</div>
            <div class="prod-nm">{escape(p['name'])}</div>
            <p class="prod-dc">{escape(p['summary'])}</p>
            <div class="prod-chips">{chips(p['chips'])}</div>
            <div class="prod-ft">
              <a href="{href_prefix}{p['slug']}.html" class="btn btn-outline" style="padding:9px 18px;font-size:.74rem">View Product</a>
              <a href="{price_href}" class="btn btn-primary" style="padding:9px 18px;font-size:.74rem">Get Latest Price <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>"""


def related_cards(slugs):
    cards = []
    for slug in slugs:
        p = BY_SLUG[slug]
        cards.append(catalog_card(p, href_prefix="", price_href=f"{p['slug']}.html#contact", img_prefix="../"))
    return "\n".join(cards)


HOME_FOOTER_LINKS = [
    ("#products", "Interactive Panels"),
    ("products/angle-pro.html", "Angle Pro"),
    ("products/vistakiosk.html", "VistaKiosk"),
    ("products/adpole.html", "AdPole"),
    ("products/edgeplay.html", "EdgePlay"),
    ("products/adzoview.html", "AdzoView"),
    ("products/brandlite.html", "BrandLite"),
    ("products/nexa.html", "Nexa & Luma"),
    ("products/fleet-iq.html", "Fleet IQ"),
]


def page_footer_links(current):
    links = [("../index.html#products", "Interactive Panels")]
    for p in CATALOG:
        if p["slug"] == current:
            continue
        if p["slug"] in ("luma", "nexa", "edgevue", "shelfscape", "rackpro") and current not in (
            "luma",
            "nexa",
            "edgevue",
            "shelfscape",
            "rackpro",
            "fleet-iq",
        ):
            continue
        links.append((f"{p['slug']}.html", p["name"]))
    # keep footer compact
    compact = [("../index.html#products", "All Products")]
    for slug, label in [
        ("angle-pro", "Angle Pro"),
        ("vistakiosk", "VistaKiosk"),
        ("adpole", "AdPole"),
        ("edgeplay", "EdgePlay"),
        ("adzoview", "AdzoView"),
        ("brandlite", "BrandLite"),
        ("nexa", "Nexa & Luma"),
        ("fleet-iq", "Fleet IQ"),
    ]:
        if slug != current:
            compact.append((f"{slug}.html", label))
    return compact


def write_product_page(p):
    page = PAGES[p["slug"]]
    ch = chrome("../")
    sizes_block = ""
    if page["sizes"]:
        sizes_block = f"""
  <section class="pd-sizes">
    <div class="container">
      <div class="reveal">
        <div class="s-label">Available Sizes</div>
        <h2 class="s-title">Choose the <em>right fit.</em></h2>
        <div class="sizes-row" style="margin-top:28px">{size_chips(page['sizes'])}</div>
      </div>
    </div>
  </section>"""
    compare_block = ""
    if page["compare"]:
        headers, rows = page["compare"]
        compare_block = f"""
  <section class="specs-section" style="padding-top:0">
    <div class="container">
      <div class="specs-hd reveal">
        <div class="s-label">Size Comparison</div>
        <h2 class="s-title">Built to <em>spec.</em></h2>
      </div>
      {compare_table(headers, rows)}
    </div>
  </section>"""
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{escape(p['name'])} — SpectraVue</title>
  <meta name="description" content="{escape(p['summary'])}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="{ch['css']}">
</head>
<body data-product="{escape(p['name'] if p['name'] != 'Fleet IQ' else 'Fleet IQ CMS')}">
{header_block(ch)}
  <section class="pd-hero">
    <div class="orb o1"></div>
    <div class="orb o2"></div>
    <div class="container">
      <div class="pd-hero-grid">
        <div>
          <div class="pd-crumb">
            <a href="{ch['home']}">Home</a><span>/</span>
            <a href="{ch['home']}#products">Products</a><span>/</span>
            <span>{escape(p['name'])}</span>
          </div>
          <div class="s-label">{escape(page['label'])}</div>
          <h1>{escape(page['headline'])}<br><em>{escape(page['italic'])}</em></h1>
          <p class="pd-lead">{escape(page['lead'])}</p>
          <div class="prod-chips">{chips(page['pills'])}</div>
          <div class="pd-btns">
            <a href="#contact" class="btn btn-primary">Get Latest Price <i class="fas fa-arrow-right"></i></a>
            <a class="btn btn-outline wa-btn">Book a Live Demo</a>
          </div>
        </div>
        {product_gallery(p)}
      </div>
    </div>
  </section>
{sizes_block}
  <section class="features">
    <div class="container">
      <div class="feat-hd reveal">
        <div class="s-label">Highlights</div>
        <h2 class="s-title">Why teams choose <em>{escape(p['name'])}.</em></h2>
      </div>
      {feat_grid(page['features'])}
    </div>
  </section>
  <section class="specs-section">
    <div class="container">
      <div class="specs-hd reveal">
        <div class="s-label">Specifications</div>
        <h2 class="s-title">Engineered <em>to perform.</em></h2>
      </div>
      {spec_rows(page['specs'])}
    </div>
  </section>
{compare_block}
  <section class="use-cases">
    <div class="container">
      <div class="reveal">
        <div class="s-label">Perfect For</div>
        <h2 class="s-title">Built for <em>real spaces.</em></h2>
        <div class="venue-chips" style="margin-top:28px">{venue_chips(page['venues'])}</div>
      </div>
    </div>
  </section>
  <section class="products pd-related">
    <div class="container">
      <div class="prod-hd">
        <div class="reveal">
          <div class="s-label">Related</div>
          <h2 class="s-title" style="margin-bottom:0">Also in the <em>collection.</em></h2>
        </div>
      </div>
      <div class="prod-grid">
{related_cards(page['related'])}
      </div>
    </div>
  </section>
{contact_block(p['name'] if p['name'] != 'Fleet IQ' else 'Fleet IQ CMS')}
{footer('../', page_footer_links(p['slug']))}
  <script src="{ch['js']}"></script>
</body>
</html>
"""
    (PRODUCTS_DIR / f"{p['slug']}.html").write_text(html)
    print("wrote", p["slug"])


NEW_CARDS = "\n\n".join(catalog_card(p, img_prefix="") for p in CATALOG)

PRODUCT_SECTION_HEAD = """  <!-- PRODUCTS -->
  <section id="products" class="products">
    <div class="container">
      <div class="prod-hd">
        <div class="reveal">
          <div class="s-label">Product Line</div>
          <h2 class="s-title" style="margin-bottom:0">The Collection.</h2>
        </div>
        <div class="prod-tabs reveal">
          <button class="prod-tab active" onclick="filterProd('all',this)">All</button>
          <button class="prod-tab" onclick="filterProd('ifp',this)">Interactive Panels</button>
          <button class="prod-tab" onclick="filterProd('floor',this)">Floor Displays</button>
          <button class="prod-tab" onclick="filterProd('wall',this)">Wall Displays</button>
          <button class="prod-tab" onclick="filterProd('retail',this)">Retail &amp; POS</button>
          <button class="prod-tab" onclick="filterProd('software',this)">Software</button>
        </div>
      </div>
      <div class="prod-grid" id="prodGrid">
"""


def patch_index():
    path = ROOT / "index.html"
    html = path.read_text()

    # swap style for stylesheet
    s = html.find("  <style>")
    e = html.find("  </style>") + len("  </style>")
    html = html[:s] + '  <link rel="stylesheet" href="css/styles.css">' + html[e:]

    # swap script
    s = html.find("  <script>")
    e = html.find("  </script>\n</body>") + len("  </script>")
    html = html[:s] + '  <script src="js/site.js"></script>' + html[e:]

    html = html.replace(
        "<title>SpectraVue — Interactive Flat Panels</title>",
        "<title>SpectraVue — Interactive Panels & Digital Displays</title>",
    )
    html = html.replace(
        'content="SpectraVue — The India\'s most advanced interactive flat panels for enterprise and education."',
        'content="SpectraVue — Interactive flat panels and digital displays for enterprise, education, retail, and public spaces."',
    )
    html = html.replace(
        """      <p class="hero-sub">The India's most advanced interactive flat panels for enterprise and education. Zero-lag
        touch. Crystal clarity. Built to transform every space.</p>""",
        """      <p class="hero-sub">Interactive flat panels and digital displays for classrooms, boardrooms, retail, and public spaces. Zero-lag
        touch. Crystal clarity. Built to transform every space.</p>""",
    )
    html = html.replace("Explore Panels", "Explore Collection")

    # IFP data-cat
    html = html.replace(
        '<div class="prod-card reveal d1">',
        '<div class="prod-card reveal d1" data-cat="ifp">',
    )
    html = html.replace('data-cat="edu"', 'data-cat="ifp"')
    html = html.replace('data-cat="edu ent"', 'data-cat="ifp"')
    html = html.replace('data-cat="ent"', 'data-cat="ifp"')

    # product section title + tabs
    html = html.replace(
        """          <h2 class="s-title" style="margin-bottom:0">The Panels.</h2>
        </div>
        <div class="prod-tabs reveal">
          <button class="prod-tab active" onclick="filterProd('all',this)">All Panels</button>
          <button class="prod-tab" onclick="filterProd('edu',this)">Education</button>
          <button class="prod-tab" onclick="filterProd('ent',this)">Enterprise</button>
        </div>""",
        """          <h2 class="s-title" style="margin-bottom:0">The Collection.</h2>
        </div>
        <div class="prod-tabs reveal">
          <button class="prod-tab active" onclick="filterProd('all',this)">All</button>
          <button class="prod-tab" onclick="filterProd('ifp',this)">Interactive Panels</button>
          <button class="prod-tab" onclick="filterProd('floor',this)">Floor Displays</button>
          <button class="prod-tab" onclick="filterProd('wall',this)">Wall Displays</button>
          <button class="prod-tab" onclick="filterProd('retail',this)">Retail &amp; POS</button>
          <button class="prod-tab" onclick="filterProd('software',this)">Software</button>
        </div>""",
    )

    # insert new cards before closing prod-grid
    marker = """        </div>
      </div>
    </div>
  </section>

  <!-- USE CASES -->"""
    insert = f"""        </div>

{NEW_CARDS}
      </div>
    </div>
  </section>

  <!-- USE CASES -->"""
    if marker not in html:
        raise SystemExit("Could not find product grid close marker")
    html = html.replace(marker, insert, 1)

    html = html.replace(
        """        <div class="s-label">Technical Specifications</div>
        <h2 class="s-title">Engineered <em>to perform.</em></h2>
        <p class="s-sub" style="margin:0 auto">All the details that make SpectraVue exceptional across every panel.</p>""",
        """        <div class="s-label">Interactive Panel Specs</div>
        <h2 class="s-title">Engineered <em>to perform.</em></h2>
        <p class="s-sub" style="margin:0 auto">The details that define the SpectraVue interactive panel line.</p>""",
    )

    html = html.replace(
        """              <select name="product">
                <option value="">Select a panel</option>
                <option>Classroom Pro 65"</option>
                <option>Boardroom Elite 75"</option>
                <option>Education Plus 86"</option>
                <option>Mega Display 98"</option>
                <option>Bulk / Enterprise Procurement</option>
              </select>""",
        f"""              <select name="product">
                {product_options_html()}
              </select>""",
    )

    html = html.replace(
        "Leading manufacturer of interactive flat panel solutions for enterprise and education\n            nationwide. Precision engineered since 2020.",
        "Leading manufacturer of interactive panels and digital display solutions for enterprise, education, retail, and public spaces.",
    )
    html = html.replace(
        """            <li><a href="#products">Classroom Pro 65"</a></li>
            <li><a href="#products">Boardroom Elite 75"</a></li>
            <li><a href="#products">Education Plus 86"</a></li>
            <li><a href="#products">Mega Display 98"</a></li>
            <li><a href="#contact">Custom Orders</a></li>""",
        "\n".join(f'            <li><a href="{href}">{escape(label)}</a></li>' for href, label in HOME_FOOTER_LINKS)
        + '\n            <li><a href="#contact">Custom Orders</a></li>',
    )

    path.write_text(html)
    print("patched index.html")


if __name__ == "__main__":
    import sys
    if "--index" in sys.argv:
        patch_index()
    for p in CATALOG:
        write_product_page(p)
