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
def search(query):
    """Search wikiquotes for a query."""

    results = wikiquote.search(query)
    click.echo(click.style("Found {} results:".format(len(results)), bold=True))
    for result in results:
        click.echo(result)


@cli.command()
@click.option(
    '-n',
    type=int, 
    default=-1,
    help="The number of quotes to be reviewed. Default is all.",
)
@click.option(
    '-i',
    type=int, 
    default=-1,
    help="The index of a specific quote to review.",
)
@click.argument("query")
def quotes(query, n, i):
    """Reviews quotes from wikiquotes based of the given query."""

    with open(jsonfile, 'r') as file:
        data = file.read()

    all_quotes = json.loads(data)
    try : 
        quotes_list = wikiquote.quotes(query)
    except DisambiguationPageException:
        click.echo(click.style("ERROR: Disambiguation in prompt. Try searching first", fg="red"))
        return
    except NoSuchPageException:
        click.echo(click.style("ERROR: No such page found. Try searching first", fg="red"))
        return
    if i > len(quotes_list):
        click.echo(click.style("ERROR: Index out of bounds.", fg="red"))
        return
    if i > -1:
        quotes_list = [quotes_list[i]]

    idx = 0
    old_amt = len(all_quotes)
    end = len(quotes_list) if n < 0 or n > len(quotes_list) else n

    while idx < end:
        quote = format_quote(quotes_list[idx])
        new_quote = {
            "from" : query,
            "quote" : quote
        }

        click.clear()
        click.echo(click.style(query, fg='magenta', bold=True))
        click.echo(click.style("{} out of {}".format(idx+1, end), bold=True), nl=False)
        click.echo(click.style(" Already in" if new_quote in all_quotes else "", fg='green', bold=True))

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
        if res["answer"] == "Accept":
            if(new_quote in all_quotes):
                click.echo("Quote alreay in database")
                click.pause()
            else: 
                all_quotes.append(new_quote)
            idx += 1
        elif res["answer"] == "Edit":
            message = click.edit(f"{quote}")
            quotes_list.insert(idx+1, message)
            idx += 1
        elif res["answer"] == "Back":
            idx -= 1
        elif res["answer"] == "Deny":
            idx += 1
        elif res["answer"] == "Quit":
            idx = end

    out_file = open(jsonfile, "w") 
    json.dump(all_quotes, out_file, indent = 6)
    out_file.close()
    click.clear()
    click.echo("Added {} entries".format(len(all_quotes) - old_amt))

def format_quote(quote):
    return quote.replace('\n', ' ').encode('ascii', 'ignore').decode()

if __name__ == '__main__':
    cli()
