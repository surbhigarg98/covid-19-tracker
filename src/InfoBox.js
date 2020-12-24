import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './Infobox.css'

function InfoBox({title,cases,total}) {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                  {title}
                </Typography>
                <small>today:</small> <h2 className="infobox__cases" >{cases}</h2>
                <Typography className="infobox__total"  color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
