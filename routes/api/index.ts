import { Handlers } from "fresh/server.ts"
import { SMTPClient } from "denomailer"
import { config } from "dotenv"

console.log(config({ safe: true, export: true }).SMTPUSER, config({ safe: true, export: true }).SMTPPASS)

const generateHtml = (choices: Array<string>) => {
    let custom = ``;

    if (choices.includes("website")) {
        const websiteHTML = `<h4 style="margin-top: 1.25rem; margin-bottom: 0.75rem;">web design</h4>
            <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">don't leave your digital presence in 2005. customers and audiences are shaping the design trends every day. it's time to retire that old build-a-site.</p>`
        custom = custom.concat(websiteHTML)
    }

    if (choices.includes("branding")) {
        const websiteHTML = `<h4 style="margin-top: 1.25rem; margin-bottom: 0.75rem;">branding</h4>
            <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">not a copy and paste job. our design process relies on establishing a relationship with your authentic brand. say no to cookie cutter branding.</p>`
        custom = custom.concat(websiteHTML)
    }

    if (choices.includes("marketing")) {
        const websiteHTML = `<h4 style="margin-top: 1.25rem; margin-bottom: 0.75rem;">marketing</h4>
            <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">sometimes the hardest part of making a decision is making it by yourself. get analytics and insights into all of your business's potential, and turn them into execution.</p>`
        custom = custom.concat(websiteHTML)
    }

    if (choices.includes("chat")) {
        const websiteHTML = `<h4 style="margin-top: 1.25rem; margin-bottom: 0.75rem;">open source, hiking, and more</h4>
            <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">never have been a big fan of labels, so i end up doing a lot of other things. let's chat about all of that stuff, too!</p>`
        custom = custom.concat(websiteHTML)
    }

    return `
        <div style="background-color:#fff;">
            <style scoped>
                @media (max-width: 400px) {
                    div {
                        width: 60vw;
                    }
                }
                @media (max-width: 800px) {
                    div {
                        width: 50vw;
                    }
                }
                @media (max-width: 1200px) {
                    div {
                        width: 40vw;
                    }
                }
                @media (min-width: 1200px) {
                    div {
                        width: 30vw;
                    }
                }
            </style>
            <div style="margin-left: auto; margin-right: auto;">
                <a href="https://moonstripe.com/" target="_blank" rel="noopener noreferrer"><img src="https://moonstripe.com/logo.png" alt="A moon covered by clouds" style="margin-top: 12px; margin-left: 12px; width: 75px; height: auto"/></a>
                <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">my name is Kojin, and i build digital experiences for moonstripe design.</p>
                <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">we take pride in the high-quality design coupled with the rugged practicality of our projects. from a logo touch-up to a new digital strategy, there's no project too small for the whole nine yards.</p>
                ${custom}
                <p style="margin-top: 0.75rem; margin-botton: 0.75rem;">when you're ready to take your business's digital presence to the next level, don't hesitate to reach out.</p>
                <p style="margin-top: 1.5rem; margin-botton: 0.75rem; padding-left: 1.5rem;">Kojin Glick</p>
                <p style="margin-top: 0.75rem; margin-botton: 0.75rem; padding-left: 1.5rem;">Lead Developer</p>
                <a style="margin-top: 0.75rem; margin-botton: 2rem; padding-left: 1.5rem;" href="https://moonstripe.com/" target="_blank" rel="noopener noreferrer">moonstripe design</a>
            </div>
        </div>
    `
}

export const handler: Handlers = {
    async POST(req: Request) {
        const client = new SMTPClient({
            debug: {
                log: true,
                noStartTLS: false
            },
            connection: {
                hostname: "smtp.gmail.com",
                port: 465,
                tls: true,
                auth: {
                    username: Deno.env.get("ENV") !== "prod" ? config({ safe: true, export: true }).SMTPUSER : Deno.env.get('SMTPUSER'),
                    password: Deno.env.get("ENV") !== "prod" ? config({ safe: true, export: true }).SMTPPASS : Deno.env.get('SMTPPASS')
                }
            }
        })


        let result: ReadableStreamDefaultReadResult<Uint8Array> | undefined;

        const reader: ReadableStreamDefaultReader<Uint8Array> | undefined = req?.body?.getReader();

        const decoder = new TextDecoder()

        if (!result?.done) {
            result = await reader?.read();
            const requestBody = JSON.parse(decoder.decode(result?.value))
            const emailBody = generateHtml(requestBody.choices)
            console.log(Deno.env.get("ENV") !== "prod" ? "kojinglick@gmail.com" : requestBody.email)
            await client.send({
                from: "Kojin - Moonstripe <info@moonstripe.com>",
                to: Deno.env.get("ENV") !== "prod" ? "kojinglick@gmail.com" : requestBody.email,
                subject: "Moon's the limit",
                html: emailBody,
            }).then(() => console.log('sent mail to', requestBody.email)).catch(console.error)
            await client.close()
        }

        return new Response('success')
    }
}