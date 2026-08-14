#!/usr/bin/env python3
"""
blocks-cli.py — simple shell interface to navigate generated block docs

Usage examples:
  ./blocks-cli.py list --lang en
  ./blocks-cli.py search "read file" --lang it
  ./blocks-cli.py show block_name --lang en
  ./blocks-cli.py json block_name
  ./blocks-cli.py ai-export    # prints machine-readable JSON index to stdout
"""
import argparse
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, 'docs')
INDEX = os.path.join(DOCS, 'blocks-index.json')

def load_index():
    if not os.path.exists(INDEX):
        print('Index not found. Run tools/generate_block_docs.js first.', file=sys.stderr)
        sys.exit(2)
    with open(INDEX,'r',encoding='utf8') as f:
        return json.load(f)

def list_blocks(idx, lang='en'):
    for item in idx:
        name = item.get('type')
        print(name)

def search_blocks(idx, term, lang='en'):
    term = term.lower()
    for item in idx:
        if term in (item.get('type','').lower() or '') or term in (item.get('tooltip','') or '').lower():
            print(item.get('type'))

def show_block(idx, name, lang='en'):
    # find by exact or safe-name fuzzy match
    lower = name.lower()
    for item in idx:
        if item.get('type','').lower()==lower or os.path.splitext(os.path.basename(item.get('file','')))[0]==lower:
            fname = os.path.join(DOCS, lang, os.path.splitext(os.path.basename(item.get('file')))[0]+'.md')
            if os.path.exists(fname):
                print(open(fname,'r',encoding='utf8').read())
                return
            else:
                print('Doc file not found for', name, file=sys.stderr)
                return
    print('Block not found:', name, file=sys.stderr)

def json_block(idx, name):
    for item in idx:
        if item.get('type','').lower()==name.lower():
            print(json.dumps(item.get('def',{}), indent=2, ensure_ascii=False))
            return
    print('Block not found:', name, file=sys.stderr)

def ai_export(idx):
    # print compact JSON index useful for AI navigation
    out = []
    for item in idx:
        out.append({ 'type': item.get('type'), 'tooltip': item.get('tooltip',''), 'file_en': item.get('file') })
    print(json.dumps(out, indent=2, ensure_ascii=False))

def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest='cmd')
    sub_list = sub.add_parser('list')
    sub_list.add_argument('--lang', default='en')
    sub_search = sub.add_parser('search')
    sub_search.add_argument('term')
    sub_search.add_argument('--lang', default='en')
    sub_show = sub.add_parser('show')
    sub_show.add_argument('name')
    sub_show.add_argument('--lang', default='en')
    sub_json = sub.add_parser('json')
    sub_json.add_argument('name')
    sub_ai = sub.add_parser('ai-export')

    args = p.parse_args()
    idx = load_index()
    if args.cmd=='list':
        list_blocks(idx, getattr(args,'lang','en'))
    elif args.cmd=='search':
        search_blocks(idx, args.term, getattr(args,'lang','en'))
    elif args.cmd=='show':
        show_block(idx, args.name, getattr(args,'lang','en'))
    elif args.cmd=='json':
        json_block(idx, args.name)
    elif args.cmd=='ai-export':
        ai_export(idx)
    else:
        p.print_help()

if __name__=='__main__':
    main()
