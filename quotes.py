import click
from PyInquirer import prompt, print_json
import wikiquote
import json

jsonfile = "backend/src/main/data/data.json"

results = wikiquote.search("surely you can't be serious")
for r in results:
    click.echo(r)


@click.command()
@click.argument("query")
def quotes(query):
    """Goes through the all wikiquotes from the given query."""

    with open(jsonfile, 'r') as file:
        data = file.read()

    obj = json.loads(data)
    quotesList = wikiquote.quotes(query)
    acceptedList = []
    idx = 0
    old_amt = len(obj)

    while idx < len(quotesList):
        click.clear()
        click.echo(click.style(query, fg='magenta', bold=True))
        quote = format_quote(quotesList[idx])
        res = prompt_quote(quote)
        if res["answer"] == "Accept":
            new_obj = {
                "from" : query,
                "quote" : quote
            }
            if(new_obj in obj):
                click.echo("Quote alreay in database")
                click.pause()
            else: 
                obj.append(new_obj)
            idx += 1
        elif res["answer"] == "Edit":
            message = click.edit(f"{quote}")
            quotesList.insert(idx+1, message)
            idx += 1
        elif res["answer"] == "Back":
            idx -= 1
        elif res["answer"] == "Deny":
            idx += 1
        elif res["answer"] == "Quit":
            idx = len(quotesList)

    out_file = open(jsonfile, "w") 
    json.dump(obj, out_file, indent = 6)
    out_file.close()
    click.clear()
    click.echo("Added {} entries".format(len(obj) - old_amt))


def format_quote(quote):
    return quote.replace('\n', '').encode('ascii', 'ignore').decode()

def prompt_quote(quote):
    click.echo(quote)
    question =  [  
    {
        'type': 'rawlist',
        'name': 'answer',
        'choices': [
            'Accept',
            'Deny',
            'Edit',
            'Back',
            'Quit'
        ],
        'message': 'what to do?',
    }
    ]
    return prompt(question)

if __name__ == '__main__':
    quotes()
