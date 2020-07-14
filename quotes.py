import click
from PyInquirer import prompt, print_json
from wikiquote import DisambiguationPageException, NoSuchPageException
import wikiquote
import json

jsonfile = "backend/src/main/data/data.json"

@click.group()
def cli():
    """This script can be used to populate the databse with quotes from wikiquotes"""
    pass


@cli.command()
@click.argument("query")
def search(query):
    """Search wikiquotes for a query."""

    results = wikiquote.search(query)
    click.echo(click.style("Found {} results:".format(len(results)), bold=True))
    for result in results:
        click.echo(result)


@cli.command()
@click.argument("query")
def quotes(query):
    """Goes through the all wikiquotes from the given query."""

    with open(jsonfile, 'r') as file:
        data = file.read()

    obj = json.loads(data)
    try : 
        quotesList = wikiquote.quotes(query)
    except DisambiguationPageException:
        click.echo(click.style("ERROR: Disambiguation in prompt. Try searching first", fg="red"))
        return
    except NoSuchPageException:
        click.echo(click.style("ERROR: No such page found. Try searching first", fg="red"))
        return
    acceptedList = []
    idx = 0
    old_amt = len(obj)

    while idx < len(quotesList):
        click.clear()
        click.echo(click.style(query, fg='magenta', bold=True))
        quote = format_quote(quotesList[idx])
        click.echo(quote)
        res = prompt([  
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
        ])
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
    return quote.replace('\n', ' ').encode('ascii', 'ignore').decode()

if __name__ == '__main__':
    cli()
