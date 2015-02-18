# Tutorial SimpleBrowser

## Navigate and inspect pages

### Installing SimpleBrowser in your project

    PM> Install-Package SimpleBrowser

### Using SimpleBrowser to load a public page
The simplest use of SimpleBrowser is to download the contents of a known URL. In this case we take the English Wikipedia homepage. 

    var b = new Browser();
    b.Navigate("http://en.wikipedia.org");

    Console.WriteLine(b.Url);
    // http://en.wikipedia.org/wiki/Main_Page

    Console.WriteLine(b.CurrentHtml);
    // <!DOCTYPE html>
    // <html lang="en" dir="ltr" class="client-nojs">
    // <head>
    // etc..

Note that the URL is not exactly as we had requested it, because Wikipedia redirected us (status 301) to another URL. As SimpleBrowser acts as a visible (non-headless) browser would, it follows the redirect.

### Accessing specific content from a page

If we want to interact with the page, we typically want to select a specific part of the page. For example, by using the ID of an element. The Find() method allows for a number of different ways to search for elements in the page. The homepage of Wikipedia always contains a featured article for today, so let's select that information out:

    var todaysFeaturedArticle = b.Find("div", FindBy.Id, "mp-tfa");
    Console.WriteLine(todaysFeaturedArticle.Value);
    // Full text from the element and it's children. No Markup.

In this case (but not always) the result represents a specific element from the page. You can get the textual value out as in the sample, but you can also interact with the element using the Click() method or the Checked property. The Value can also be set, which is especially appropriate when the result is an input box or text area. You can also access more detailed information using the XElement property. This will expose the XML structure of the element an allow you to navigate the details of the structure of the page.

### Multiple elements
When multiple elements exist that conform to your specification, you can still use Find(). The return type, HtmlResult can also serve as a collection of elements. When you use te properties and methods described above, it will apply them on the *first element found*. But it also exposes properties like TotalElementsFound and implements IEnumerable<HtmlResult>. Let's loop through all links in the page:

    var links = b.Find("a", new object { });
    foreach (var link in links)
    {
        Console.WriteLine("Found link with text '{0}' and title '{1}' to {2}", link.Value, link.GetAttribute("title"), link.GetAttribute("href"));
    }
    //Found link with text 'Sofia' and title 'Sofia' to /wiki/Sofia
    //Found link with text 'Ottoman' and title 'Ottoman Empire' to /wiki/Ottoman_Empire
    //Found link with text '1942' and title '1942' to /wiki/1942
    //Found link with text 'World War II' and title 'World War II' to /wiki/World_War_II
    //Found link with text 'Imperial Japanese Army' and title 'Imperial Japanese Army' to /wiki/Imperial_Japanese_Army
    //Found link with text 'systematic extermination' and title 'Sook Ching' to /wiki/Sook_Ching
    //Found link with text 'Chinese Singaporeans' and title 'Chinese Singaporean' to /wiki/Chinese_Singaporean
    //...

###Using Select

The Find() method offers a number of different ways to filter your elements (FindBy.Name, FindBy.Text, FindBy.PartialText, etc...). These methods were designed before jquery made CSS selectors the de facto query language inside HTML documents. To allow you to use this in SimpleBrowser as well, the Select() method was added. It takes a string as its single argument, but you should be able to express most of the queries you'll need with that. This is how we first loop over all links in the "Today's Featured Arcticle" block and then click on the main articles link (which on Wikipedia is the first bold link). 


    var b = new Browser();
    b.Navigate("http://en.wikipedia.org");
    var links = b.Select("#mp-tfa a[href]"); // all links with a href inside #mp-tfa
    foreach (var link in links)
    {
        Console.WriteLine("Found link with text '{0}' and title '{1}' to {2}", link.Value, link.GetAttribute("title"), link.GetAttribute("href"));
    }
    var mainlink = b.Select("#mp-tfa b>a[href]");// all links with <a href> directly inside a <b> inside #mp-tfa
    mainlink.Click();
    Console.WriteLine("Url: {0}", b.Url);

    // Found link with text 'SMS Bayern' and title 'SMS Bayern' to /wiki/SMS_Bayern
    // Found link with text 'class' and title 'Ship class' to /wiki/Ship_class
    // Found link with text 'battleships' and title 'Battleship' to /wiki/Battleship
    // Found link with text 'German Imperial Navy' and title 'Kaiserliche Marine' to /wiki/Kaiserliche_Marine
    // ...
    // Url: http://en.wikipedia.org/wiki/SMS_Bayern

The Select() method can also be used in the scope of a single element. This allows you to search within a part of the page.

## Submitting forms
TBD

## Login scenarios
TBD
### Cookie based forms
TBD

### Basic Authentication
TBD

## Using HTTPS/SSL
TBD

## Navigating backward and forward
TBD

## Using multiple windows
TBD

## Debugging
TBD

### Inspect current state
TBD
### Log requests
TBD
### Logging errors
TBD

